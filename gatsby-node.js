const path = require(`path`)
const fs = require('fs');

exports.createPages = ({ graphql, actions}) => {
    const { createPage } = actions

    return graphql(`
        {
            localImages: allFile(
                filter: {
                    extension: {regex: "/(jpeg|jpg|png)/"},
                    sourceInstanceName: {eq: "images"}
                },
                sort: {
                    fields: [absolutePath]
                    order: [ASC]
                }
            ) {
                edges {
                    node {
                        absolutePath
                        childImageSharp {
                            fixed(quality: 95, width: 450, height: 300, cropFocus: NORTH) {
                                src
                            }
                            fluid(quality: 90) {
                                originalImg
                            }
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            throw result.errors
        }

        const images = result.data.localImages.edges.map((edge,i) => {
            const splitted = edge.node.absolutePath.split(".")
            const title = splitted[splitted.length-2].endsWith("_v") ? "Photographed by our wonderful guests" : "Hannu Tiainen Photography"
            return {
                "id": i+1,
                "l": edge.node.childImageSharp.fluid.originalImg,
                "s": edge.node.childImageSharp.fixed.src,
                "title": title
            }
        })

        /* Gatsby will use this template to render the paginated pages (including the initial page for infinite scroll). */
        const paginatedPageTemplate = path.resolve(`src/templates/paginatedPageTemplate.js`)

        /* Iterate needed pages and create them. */
        const countImagesPerPage = 20
        const countPages = Math.ceil(images.length / countImagesPerPage)
        for (var currentPage=1; currentPage<=countPages; currentPage++) {
            const pathSuffix = (currentPage>1? currentPage : "") /* To create paths "/", "/2", "/3", ... */

            /* Collect images needed for this page. */
            const startIndexInclusive = countImagesPerPage * (currentPage - 1)
            const endIndexExclusive = startIndexInclusive + countImagesPerPage
            const pageImages = images.slice(startIndexInclusive, endIndexExclusive)

            /* Combine all data needed to construct this page. */
            const pageData = {
                path: `/${pathSuffix}`, 
                component: paginatedPageTemplate,
                context: {
                    pageImages: pageImages,
                    currentPage: currentPage,
                    countPages: countPages
                }
            }

            /* Create normal pages (for pagination) and corresponding JSON (for infinite scroll). */
            createJSON(pageData)
            createPage(pageData)
        }
        console.log(`\nCreated ${countPages} pages of paginated content.`)

        /* Create pages for images, too. */
        for (var currId=1; currId<=images.length; currId++) {
            const prevId = (currId == 1 ? images.length : currId-1)
            const nextId = (currId >= images.length ? 1 : currId+1)
            const pageData = {
                path: `/images/${currId}`, 
                component: path.resolve(`src/templates/imagePageTemplate.js`),
                context: {
                    image: images[currId-1],
                    nextId: nextId,
                    prevId: prevId,
                    prefetchURL: images[nextId-1].l
                }
            }
            createPage(pageData)
        }

    })
}

function createJSON(pageData) {
    const pathSuffix = pageData.path.substring(1)
    const dir = "public/paginationJson/"
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    const filePath = dir+"index"+pathSuffix+".json";
    const dataToSave = JSON.stringify(pageData.context.pageImages);
    fs.writeFile(filePath, dataToSave, function(err) {
      if(err) {
        return console.log(err);
      }
    }); 
}
