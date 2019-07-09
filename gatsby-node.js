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
                            fixed(quality: 93, width: 450, height: 300, cropFocus: NORTH) {
                                src
                            }
                            fluid(quality: 90, maxWidth: 2048, traceSVG: { color: "#f9ebd2" }) {
                                tracedSVG
                                aspectRatio
                                src
                                srcSet
                                sizes
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

        /* Separate crop helpers from actual images. */
        const edges = result.data.localImages.edges
        const cropHelperEdges = {}
        const imageEdges = []
        edges.forEach(edge => {
            const name = parseName(edge.node.absolutePath)
            if (name.endsWith("_crophelper")) cropHelperEdges[name] = edge
            else imageEdges.push(edge)
        })

        /* Create metadata JSON for actual images. */
        var nextFreeId = 1
        images = []
        imageEdges.forEach(edge => {
            const name = parseName(edge.node.absolutePath)
            /* Infer photographer attribution from name. */
            const title = name.endsWith("_v") ? "Photographed by our wonderful guests" : "Hannu Tiainen Photography"
            
            /* Use thumbnail from crop helper if that's available. */ 
            const key = name+"_crophelper"
            const thumb = (
                cropHelperEdges[key] ?
                cropHelperEdges[key].node.childImageSharp.fixed :
                edge.node.childImageSharp.fixed
            )

            images[nextFreeId] = {
                "id": nextFreeId,
                "l": edge.node.childImageSharp.fluid,
                "s": thumb,
                "title": title
            }
            nextFreeId++
        })

        /* Gatsby will use this template to render the paginated pages (including the initial page for infinite scroll). */
        const paginatedGalleryTemplate = path.resolve(`src/templates/paginatedGalleryTemplate.js`)

        /* Iterate needed pages and create them. */
        const countImagesPerPage = 20
        const countPages = Math.ceil(nextFreeId / countImagesPerPage)
        for (var currentPage=1; currentPage<=countPages; currentPage++) {
            const pathSuffix = (currentPage>1? currentPage : "") /* To create paths "/", "/2", "/3", ... */

            /* Collect images needed for this page. */
            const startIndexInclusive = countImagesPerPage * (currentPage - 1) + 1
            const endIndexExclusive = startIndexInclusive + countImagesPerPage
            const pageImages = images.slice(startIndexInclusive, endIndexExclusive)

            /* Combine all data needed to construct this page. */
            const pageData = {
                path: `/${pathSuffix}`, 
                component: paginatedGalleryTemplate,
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
        for (var currId=1; currId<nextFreeId; currId++) {
            const prevId = (currId == 1 ? nextFreeId-1 : currId-1)
            const nextId = (currId == nextFreeId-1 ? 1 : currId+1)
            const next2Id = (nextId == nextFreeId-1 ? 1 : nextId+1)
            const pageData = {
                path: `/images/${currId}`, 
                component: path.resolve(`src/templates/postcardTemplate.js`),
                context: {
                    image: images[currId],
                    nextId: nextId,
                    prevId: prevId,
                    prefetch1: images[nextId].l,
                    prefetch2: images[next2Id].l
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

function parseName(absolutePath) {
    const splitted = absolutePath.split(".")
    return splitted[splitted.length-2]
}