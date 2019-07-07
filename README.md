<h1 align="center">
  Gatsby Starter Photo Book
</h1>

Hi, I created this because I wanted to share our wedding pictures on a fast & beautiful user-friendly website. This is a fork of my other project [Gatsby Starter Infinite Scroll](https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll), which is more of a general purpose starter whereas this one is specialized for sharing photosets. 

## Get started

Fork and `npm install`. Run in dev mode with `gatsby develop`. Just drop your photos in `content/images` and you're all set! (Ok you probably want to edit some text, favicon, etc. - but almost done!)

## Features

- Beautiful, **responsive** "postcard" view for desktop users, compact view for mobile users.
- Thumbnails of photos generated to home page on a responsive CSS grid with **minimal whitespace**.
- **No waiting**: while the user looks at a photo, the next photo is being prefetched so it can be delivered instantly. Home page doesn't make you wait either; infinite scroll activates and loads more items before you scroll all the way down.
- When the user returns from a photo to front page, **scroll position** is set to the thumbnail of the last photo they viewed and a visual indicator is given.
- Friendly to users who have disabled JS. All important features have **non JS fallback**.

## Known issues

- Automated photo cropping is used and it is what it is. You can manually crop some of the photos if you like.
- Mobile users' compact view aligns photos to the top instead of vertically middle. It looks good but would be better with vertical alignment. TODO.

## 🎓 Attribution

- My wife Marianne was integral in the design.
- Icons are from FontAwesome.
- I will create a demo site with photos from [Unsplash](https://unsplash.com).
