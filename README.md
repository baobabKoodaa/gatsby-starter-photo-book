<h1 align="center">
  :camera: Gatsby Starter Photo Book :camera:
</h1>

»»» [Live demo](https://gatsby-starter-photo-book.netlify.com) «««

## :notebook: Key features

- **Gallery**: auto-generated thumbnails are presented on **CSS Grid** with **infinite scroll**.
- Beautiful **"postcard" view** for photos with **fullscreen toggle**.
- Both views are **responsive** with **minimal whitespace** and **polished UX**.
- Many **performance optimizations** for image delivery (both by Gatsby & way beyond what Gatsby can do).

## :zap: Get started

1. Fork and `npm install`.
2. Drop your photos in `content/images`.
3. Run in dev mode with `gatsby develop`.  
...and you're all set! (Ok you probably want to edit some text, colors, favicon, etc. - but almost done!)

## :gem: UX

- Friendly to users who have disabled JS. All important features are either designed to work entirely without JS or have **non JS fallback**. For example, infinite scroll **gracefully degrades** into pagination.
- When the user clicks on an image from the gallery, we immediately render a **prefetched page** with a **tracedSVG placeholder** stylized into the site's theme, and **fade-over transition** into the actual photo once it has been downloaded.
- When the user navigates between photos in postcard view, we either:
    - Snap to the next photo if it has been downloaded
    - Or snap to placeholder and transition into the photo when it's downloaded.
- **No flicker** when the user navigates between photos (this was actually _very_ difficult to implement without sacrificing pre-rendered pages that work without JS and without sacrificing placeholder images).
- When the user clicks 'x' to return from postcard view to gallery, **scroll position** is set to the thumbnail of the last photo they viewed and a visual indicator is given to help the user adjust their sight to the next unseen photo. This is better than simply remembering scroll position, because a user can browse several photos in postcard view before returning to gallery (in that case we want to scroll to the last thumbnail, not the first). This feature degrades gracefully if the user navigates with the browser's back button instead of clicking 'x' (in that case, we just remember the scroll position).
- The postcard view is **slightly different on small vs large screens**:
    - Large screens: the photo is decorated like a postcard in the center of the screen with buttons usually outside the photo.
    - Small screens: maximum screen real estate for photos. Reduced decoration. Buttons can overlay on the photo, but the most obtrusive buttons (prev/next) are hidden. When the user first navigates to an image, they are flashed a visual cue to indicate that they can navigate to prev/next by clicking anywhere. The cue is flashed again if the user returns to the site later, but it is not flashed again during the same session.
- You can tell a story with your images, because the gallery has **row-based order** (many other photo website implementations use column-based order, e.g. masonry CSS, which looks great, but causes the order of images to feel random to users who are used to scanning photos horizontally.)

## :cyclone: Performance

There's some standard optimizations by Gatsby, like generating different sized versions of images and allowing the **browser to choose how large of an image it needs** for your device. There's also a couple interesting custom optimizations that deliver a huge boost in performance. One is related to image prefetching (in postcard view) and the other is related to page prefetching (in gallery view).

---

In postcard view, once the current image has loaded, the browser sends requests for the next 2 images and one previous image in anticipation that you may want to navigate to previous or next images. **The trick** that I use to preload images optimally: add transparent images on top of the current image so that the browser can choose the proper sized image from the srcSet. These images are added to the DOM only _after_ the current image has loaded, so we don't steal bandwidth from it.

Note that this is superior to standard `<link rel="prefetch">` for 3 reasons, in order of importance:

1. You can't leverage srcSets with regular prefetching (the browser couldn't possibly know which sized image to download).
2. Some browsers (like Chrome at this time) will start prefetching before the current image has fully loaded. In my experiments this ~doubled the time to deliver the current image.
3. Browsers can choose to ignore prefetch tags at their discretion.

---

You may notice there are two kinds of paths to photos: `/images/58` and `/images/fromGallery?id=58`. That's ugly, I know. Let me explain.

1. The first version of this starter used query parameters only (the `?id=58` URLs). These pages wouldn't work without JavaScript, so that's unacceptable.
2. In order to support non JS users we moved onto generated pages with URLs like `/images/58`. This meant that each link from the gallery had to be prefetched separately (instead of prefetching a single `/images/fromGallery` page). Sometimes when a lot of thumbnails were loading on mobile, there would be a few seconds delay between clicking a thumbnail and rendering a page, so that's unacceptable.
3. The obvious solution was to use both kinds of paths: query parameters for gallery links and generated pages for everything else. (And, obviously, gallery links have to point to different paths between JS and non JS users.) But now we have 2 different URL paths visible to the end user, that's not acceptable.
4. What if we do a quick SPA navigation from query parameter URL to generated page? This works, but it hurts performance. The browser starts downloading photos (both the current image and the preload images), then it stops downloading photos, and then it starts downloading photos again. That's not acceptable.
5. What if we wait until the current image has loaded, and _then_ navigate from query parameter URL to generated page? This worked really nicely and didn't hurt performance and mostly hid the alternative URL from end users... but there's an edge case where a user opens an image from gallery, and then immediately navigates to prev/next. In that case they will get directed _back_ to the previous page when the image from previous page loads. That's definitely not acceptable, so back to number 3, and here we are.

---

In addition, gallery's infinite scroll:
- Loads more items _before_ you scroll all the way down to look at loading spinners or blur-ups.
- Fetches metadata ~20 items at a time (as opposed to fetching _all_ metadata at initial page load, like many other implementations do).
- The first ~20 items are delivered with the initial page without waiting for metadata fetches.

## :sparkles: Tips

- Thumbnails are generated automatically, with cropping. Set the aspect ratio in `gatsby-node.js` to whichever aspect ratio is most common in your photoset. If many of your photos need cropping (=are not the desired aspect ratio), you will probably want to tweak your crops. You can change the crop mode (NORTH, CENTER and ATTENTION work the best). You can also manually pre-crop some photos: make a copy of your photo, crop it approximately to the desired aspect ratio, and the Photo Book will then create the thumbnail by cropping your pre-cropped photo. Why crop 2 times? To save your time and nerves (making approximate crops by hand is faster than making exact crops). You need to use this naming convention: if your original photo is `cat.jpg`, name the pre-cropped photo `cat_crophelper.jpg`.

## :beetle: Known issues

- Chrome on Android sometimes shows the address bar, sometimes doesn't (depends on whether the user last scrolled upwards or downwards in gallery). When the address bar is hidden, extra space appears in the bottom that the photo doesn't utilize. This happens because the photo and all its parents have `100%` height. An alternative is to use `100vh` height, but that's worse, because then the bottom part of photos is 'cut off' when the address bar is visible (unless the user realizes they need to scroll down). If the user enters the postcard view without address bar, they can scroll up to make the address bar visible. If the address bar is fully visible, the user can not scroll down to hide the address bar. I was unable to resolve the issue properly so as a workaround I added a full screen toggle for small screens. It works nicely.
- Sometimes cornerCaseHandler tries to initiate fetches to pages that don't exist. I've had difficulty reproducing this, but I've seen it twice. There's no harm from doing these fetches so I've just supressed the errors from them for now.
- Updating Gatsby-related dependencies causes placeholder SVGs to misalign. It is somehow related to a change in how Gatsby generates SVGs (after updating, they no longer contain a viewBox attribute, and they scale incorrectly).

## 🎓 Attribution

Hi, I'm Atte and I created this because I wanted to share our wedding photos on a fast & beautiful user-friendly website. This is a fork of my other project [Gatsby Starter Infinite Scroll](https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll), which is more of a general purpose starter whereas this one is specialized for sharing photosets. 

- My wife Marianne was integral in the design.
- Images are from [Unsplash](https://unsplash.com).
- Icons are from [FontAwesome](https://www.fontawesome.com).
- Infinite scroll uses some code from Jared Palmer's [react-simple-infinite-scroll](https://github.com/jaredpalmer/react-simple-infinite-scroll).
- Gallery CSS Grid is modified from work by [LekoArts](https://www.lekoarts.de/).
