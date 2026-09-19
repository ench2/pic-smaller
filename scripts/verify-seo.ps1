param(
  [string]$BaseUrl = 'https://piczip.ajutx.com'
)

$ErrorActionPreference = 'Stop'
$origin = 'https://piczip.ajutx.com'
$locales = @('en-US', 'zh-CN', 'zh-TW', 'tr-TR', 'fr-FR', 'es-ES', 'ko-KR', 'ja-JP', 'fa-IR')
$agents = @{
  Browser = 'Mozilla/5.0'
  Googlebot = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
  Bingbot = 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
  OAI_SearchBot = 'Mozilla/5.0 (compatible; OAI-SearchBot/1.3; +https://openai.com/searchbot)'
  PerplexityBot = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)'
}
$paths = @('/') + @($locales | ForEach-Object { "/$_/" })
$checks = 0

function Assert-Check([bool]$condition, [string]$message) {
  if (!$condition) { throw $message }
}

foreach ($agent in $agents.GetEnumerator()) {
  foreach ($path in $paths) {
    $lang = if ($path -eq '/') { 'en-US' } else { $path.Trim('/') }
    $relative = if ($path -eq '/') { 'index.html' } else { "$lang/index.html" }
    $expectedPath = Join-Path $PSScriptRoot "../out/$relative"
    $expected = Get-Content -LiteralPath $expectedPath -Raw -Encoding utf8
    $response = Invoke-WebRequest -Uri "$($BaseUrl.TrimEnd('/'))$path" -UserAgent $agent.Value -TimeoutSec 30 -MaximumRedirection 0
    $html = $response.Content
    $label = "$($agent.Key) $path"
    Assert-Check ($response.StatusCode -eq 200) "$label did not return 200"
    Assert-Check ([string]$response.Headers['Content-Type'] -match 'text/html') "$label is not HTML"
    Assert-Check ([string]$response.Headers['X-Robots-Tag'] -notmatch '(?i)noindex|none') "$label blocks indexing"
    foreach ($pattern in @('<title>.*?</title>', '<h1[^>]*>.*?</h1>', '<script type="application/ld\+json">.*?</script>')) {
      $want = [regex]::Match($expected, $pattern).Value
      $got = [regex]::Match($html, $pattern).Value
      Assert-Check ($want.Length -gt 0 -and $got -eq $want) "$label differs from built SEO content: $pattern"
    }
    Assert-Check ([regex]::Matches($html, '<h1(?:\s|>)').Count -eq 1) "$label must contain one H1"
    Assert-Check ($html.Contains("rel=`"canonical`" href=`"$origin/$lang/`"")) "$label canonical mismatch"
    Assert-Check ($html.Contains('name="robots" content="index, follow"')) "$label robots metadata mismatch"
    Assert-Check ($html.Contains('id="faq"')) "$label FAQ is absent"
    Assert-Check ($html.Contains('id="specs"')) "$label Specs is absent"
    Assert-Check ($html.Contains('id="comparison"')) "$label Comparison is absent"
    $script = [regex]::Match($html, '<script type="application/ld\+json">(.*?)</script>').Groups[1].Value
    $graph = ($script | ConvertFrom-Json).'@graph'
    Assert-Check ($graph.Count -eq 3 -and $graph[2].mainEntity.Count -eq 5) "$label invalid structured data"
    foreach ($alternate in $locales) {
      Assert-Check ($html.Contains("hrefLang=`"$alternate`"")) "$label missing alternate language $alternate"
      Assert-Check ($html.Contains("href=`"/$alternate/`"")) "$label missing crawlable language link $alternate"
    }
    $checks++
  }
  $llms = Invoke-WebRequest -Uri "$($BaseUrl.TrimEnd('/'))/llms.txt" -UserAgent $agent.Value -TimeoutSec 30
  Assert-Check ($llms.StatusCode -eq 200 -and [string]$llms.Headers['Content-Type'] -match 'text/plain') 'Invalid llms.txt response'
  Assert-Check ($llms.Content -match 'LiteFrame') 'llms.txt content mismatch'
  $llmsFull = Invoke-WebRequest -Uri "$($BaseUrl.TrimEnd('/'))/llms-full.txt" -UserAgent $agent.Value -TimeoutSec 30
  Assert-Check ($llmsFull.StatusCode -eq 200 -and [string]$llmsFull.Headers['Content-Type'] -match 'text/plain') 'Invalid llms-full.txt response'
  Assert-Check ($llmsFull.Content -match 'LiteFrame') 'llms-full.txt content mismatch'
  $robots = Invoke-WebRequest -Uri "$($BaseUrl.TrimEnd('/'))/robots.txt" -UserAgent $agent.Value -TimeoutSec 30
  Assert-Check ($robots.StatusCode -eq 200 -and [string]$robots.Headers['Content-Type'] -match 'text/plain') 'Invalid robots response'
  Assert-Check ($robots.Content -match 'User-Agent: \*\s+Allow: /') 'Crawlers not allowed'
  Assert-Check ($robots.Content -notmatch 'Disallow:\s*/') 'Unexpected crawler restriction'
  Assert-Check ($robots.Content.Contains("Sitemap: $origin/sitemap.xml")) 'Missing sitemap directive'
  $mapResponse = Invoke-WebRequest -Uri "$($BaseUrl.TrimEnd('/'))/sitemap.xml" -UserAgent $agent.Value -TimeoutSec 30
  Assert-Check ($mapResponse.StatusCode -eq 200 -and [string]$mapResponse.Headers['Content-Type'] -match 'xml') 'Invalid sitemap response'
  [xml]$map = $mapResponse.Content
  Assert-Check ($map.urlset.url.Count -eq 9) 'Expected nine canonical sitemap URLs'
  foreach ($lang in $locales) {
    Assert-Check ($map.urlset.url.loc -contains "$origin/$lang/") "Missing sitemap URL: $lang"
  }
  $missing = Invoke-WebRequest -Uri "$($BaseUrl.TrimEnd('/'))/no-such-seo-page" -UserAgent $agent.Value -TimeoutSec 30 -SkipHttpErrorCheck
  Assert-Check ($missing.StatusCode -eq 404) 'Unknown path must return a real 404'
  $checks += 3
  Write-Output "$($agent.Key): 10 HTML pages + robots + sitemap + 404 passed"
}
Write-Output "PASS: $checks responses verified against the current static export at $BaseUrl"
