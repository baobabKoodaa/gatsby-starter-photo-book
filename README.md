<h1 align="center">
  :camera: Gatsby Starter Photo Book :camera:
</h1>

## :notebook: Key features

- **Gallery**: auto-generated thumbnails are presented on **CSS Grid** with **infinite scroll**.
- Beautiful **"postcard" view** for photos with **fullscreen toggle**.
- Both views are **responsive** with **minimal whitespace**.
- Many **performance optimizations** for image delivery (both by Gatsby & way beyond what Gatsby can do).

## :zap: Get started

1. Fork and `npm install`.
2. Drop your photos in `content/images`.
3. Run in dev mode with `gatsby develop`.  
...and you're all set! (Ok you probably want to edit some text, colors, favicon, etc. - but almost done!)

## :cyclone: Performance

This is what happens when you click on an image from the gallery:
1. A **prefetched page** is instantly rendered to you with a **tracedSVG placeholder** for the image, stylized into the site's theme.
2. Different sized versions of images have been generated, so the **browser can choose how large of an image it needs** for the user's device.
3. When the image has loaded, two things happen:
    - A fade-over transition begins from the placeholder to the actual image.
    - The browser sends requests for the next 2 images and one previous image in anticipation that you may want to navigate to previous or next images. Note that this is superior to `<link rel="prefetch">` for 3 reasons, in order of importance:
        1. You can't leverage srcSets with regular prefetching (the browser couldn't possibly know which sized image to download).
        2. Some browsers (like Chrome at this time) will start prefetching before the current image has fully loaded. In my experiments this ~doubled the time to deliver the current image.
        3. Browsers can choose to ignore prefetch tags at their discretion.
      
      **The trick** that I use here: add transparent images on top of the current image so that the browser can choose the proper sized image from the srcSet. These images are added to the DOM only _after_ the current image has loaded, so we don't steal bandwidth from it.
4. When the user navigates to next or previous image, it has hopefully loaded and can be shown instantly. In that case the placeholder transition animation can be skipped and we can snap from previous photo to next photo. If the image has not loaded, we will snap to placeholder and transition to the image once it loads.

In addition, gallery's infinite scroll
- Loads more items _before_ you scroll all the way down to look at loading spinners or blur-ups.
- Has pre-rendered the first page of results so it can be rendered without additional metadata fetches.
- Does metadata fetches ~20 items at a time (as opposed to _all_ metadata, like many other implementations).

## :gem: UX

- Friendly to users who have disabled JS. All important features are either designed to work without JS or have **non JS fallback**. For example, infinite scroll **gracefully degrades** into pagination.
- When the user clicks 'x' to return from postcard view to gallery, **scroll position** is set to the thumbnail of the last photo they viewed and a visual indicator is given to help the user adjust their sight to the next unseen photo. This is better than simply remembering scroll position, because a user can browse several photos in postcard view before returning to gallery (in that case we want to scroll to the last thumbnail, not the first). This feature degrades gracefully if the user navigates with the browser's back button instead of clicking 'x' (in that case, we just remember the scroll position).
- The postcard view is slightly different on small vs large screens:
    - Large screens: the photo is decorated like a postcard in the center of the screen with buttons usually outside the photo.
    - Small screens: maximum screen real estate for photos. Reduced decoration. Buttons can overlay on the photo, but the most obtrusive buttons (prev/next) are hidden. When the user first navigates to an image, they are flashed a visual cue to indicate that they can navigate to prev/next by clicking anywhere. The cue is flashed again if the user returns to the site later, but it is not flashed again during the same session.
- You can tell a story with your images, because the gallery has **row-based order** (many other photo website implementations use column-based order, e.g. masonry CSS, which looks great, but causes the order of images to feel random to users who are used to scanning photos horizontally.)

## :sparkles: Tips

- Thumbnails are generated automatically, with cropping. Set the aspect ratio in `gatsby-node.js` to whichever aspect ratio is most common in your photoset. If many of your photos need cropping (=are not the desired aspect ratio), you will probably want to tweak your crops. You can change the crop mode (NORTH, CENTER and ATTENTION work the best). You can also manually pre-crop some photos: make a copy of your photo, crop it approximately to the desired aspect ratio, and the Photo Book will then create the thumbnail by cropping your pre-cropped photo. Why crop 2 times? To save your time and nerves (making approximate crops by hand is faster than making exact crops). You need to use this naming convention: if your original photo is `cat.jpg`, name the pre-cropped photo `cat_crophelper.jpg`.

## :beetle: Known issues

- Chrome on Android sometimes shows the address bar, sometimes doesn't (depends on whether the user last scrolled upwards or downwards in gallery). When the address bar is hidden, extra space appears in the bottom that the photo doesn't utilize. This happens because the photo and all its parents have `100%` height. An alternative is to use `100vh` height, but that's worse, because then the bottom part of photos is 'cut off' when the address bar is visible (unless the user realizes they need to scroll down). If the user enters the postcard view without address bar, they can scroll up to make the address bar visible. If the address bar is fully visible, the user can not scroll down to hide the address bar. I was unable to resolve the issue properly so as a workaround I added a full screen toggle for small screens. It works nicely.

## 🎓 Attribution

Hi, I'm Atte and I created this because I wanted to share our wedding photos on a fast & beautiful user-friendly website. This is a fork of my other project [Gatsby Starter Infinite Scroll](https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll), which is more of a general purpose starter whereas this one is specialized for sharing photosets. 

- My wife Marianne was integral in the design.
- Icons are from FontAwesome.
- I will create a demo site with photos from [Unsplash](https://unsplash.com).
