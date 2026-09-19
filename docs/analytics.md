# GA4 integration

The verified LiteFrame web stream is `G-CMCBVVY1XF`, for
`https://piczip.ajutx.com` (stream ID `15805854754`). The measurement ID is public.
It is the default in `src/analytics.ts`; set `NEXT_PUBLIC_GA_MEASUREMENT_ID` at
**build time** to override it, or set it to an empty string to disable tracking.
Development builds do not load GA. Production builds do, including local previews
if the visitor explicitly opts in. Browser tests intercept Google requests and
never send their test events to GA.

## Privacy and event behavior

- Basic consent mode: no Google script/request before opt-in; decline is equally accessible.
- Choices expire after 180 days. Storage errors fail closed on the next visit.
- Consent to analytics never grants advertising consent; Google Signals and
  ad-personalization signals are disabled.
- Withdrawal stops application events, disables GA collection and clears accessible
  GA cookies, without reloading or losing the user's image work. Already sent data
  is not recalled. Choices synchronize across tabs.
- One explicit `page_view` per document/locale; root redirect and error pages do not
  initialize GA. Locale navigation creates a new document.
- Events: `images_imported` (image_count), `compression_completed`
  (input_format, output_format, result: success/preserved/error), `image_download`
  (output_format), `batch_download` (image_count). Recompression is a new operation.
- No image contents, filenames, paths, raw errors, URL query strings or fragments
  are sent by these events. Referrers are reduced to their origin.
- **Disable Enhanced Measurement in the GA4 web stream**: the app owns pageviews
  and download tracking; Google's automatic events could duplicate events or
  collect link URLs. Do not add another GTM/gtag integration alongside this one.
  Disabled with the owner's approval on 2026-09-19 for stream `15805854754`;
  the console confirms the Enhanced Measurement switch is off.

## Validation and deployment

1. Run `npm test`, `npm run lint`, `npm run build`, `npm run test:browser`.
2. For Cloudflare static hosting also run `npm run build:pages`; deploy `out/`
   through the site's existing release process. The privacy policy is
   `/privacy.html`, available in static and standalone deployments.
3. After publishing, open the live site, opt in, and verify a visit, image import,
   compression and download in GA4 Realtime / DebugView or Tag Assistant.
   Local offline tests do not prove server receipt; the installation check only
   checks the public deployment, not local source changes. Basic consent may
   require a manual opted-in visit rather than an unattended scanner.
4. Publish the updated privacy policy with the code. Add the operator's actual
   contact information and review region-specific obligations before monetization.

## AdSense status

The current Google account has no AdSense account. No ad script, publisher ID,
fabricated `ads.txt`, or advertising consent was added. Complete registration,
country/payment details, site approval and certified CMP setup where required;
then integrate the issued publisher ID and real ad units. The simple analytics
consent UI is **not** a Google-certified advertising CMP.

## Production deployment and receipt verification — 2026-09-19

- Production hostname `piczip.ajutx.com` is mapped to Worker `pic-smaller`.
- Built with `npm run build:pages` and deployed using `npx wrangler deploy`.
- Active version (100%): `40ba67f9-20df-4004-88ed-d7fe5aebcf0f`, deployed
  2026-09-19 03:08 UTC. Previous version for rollback:
  `73f0fced-087f-427b-bc84-82083a534664`.
- Live `/privacy.html` returns HTTP 200 and contains the GA4 policy. The live
  Chinese tool renders the new consent controls and successfully processes a
  generated SVG fixture (120 × 80; 163 bytes to 155 bytes).
- In an actual browser on the production hostname: accepted analytics, imported
  that synthetic image, completed compression, downloaded one image and a ZIP.
  No real user's images or filenames were used as test content.
- At 2026-09-19 11:10 China time, GA4 **Realtime overview** for property
  `555045048` showed **1 active user**, **1 page view**, and these received events,
  each with count **1**: `page_view`, `images_imported`,
  `compression_completed`, `image_download`, `batch_download`.
- The page title in the server-side report was `LiteFrame — Image tools`.
  This verifies real Google receipt, not just local `dataLayer` queueing.
  The verification contributes a small amount of test data to the property;
  standard reports and installation-status notices can update later than Realtime.
- Realtime report:
  https://analytics.google.com/analytics/web/#/a408768863p555045048/realtime/overview
- This was a direct deployment of the local working tree; no Git commit or push
  was performed. Keep these source changes when preparing a later Git-based release.
