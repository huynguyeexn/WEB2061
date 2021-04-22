const cheerio = require("cheerio"); // khai báo module cheerio

const request = require("request-promise"); // khai báo module request-promise

const fs = require("fs");

let db = { categories: [], products: [] };

request("https://www.thegioididong.com/dtdd").then((body) => {
    console.log("Start crawl!");
    getCategoriesName(body).then((urlList) => getProductOfCategory(urlList));
});

const getCategoriesName = (html) => {
    return new Promise((resolve, reject) => {
        try {
            let categories = [];
            let listUrl = [];
            let id = 0;
            const $ = cheerio.load(html); // load HTML
            $(".manu14")[0].children.forEach((el) => {
                if (el.name == "a" && !el.onclick) {
                    if (el.attribs) {
                        if (el.attribs["data-name"]) {
                            let slug = el.attribs.href.replace("/", "");

                            categories.push({
                                id: ++id,
                                slug: slug,
                                name: el.attribs["data-name"],
                                createdAt: Date.now(),
                                updatedAt: Date.now(),
                            });

                            listUrl.push({
                                catId: id,
                                url: el.attribs.href,
                            });
                        }
                    }
                }
            });
            db.categories = categories;
            console.log("Get Categories Successfully!");
            resolve(listUrl);
        } catch (error) {
            reject(error);
        }
    });
};

const getProductOfCategory = (urlList) => {
    let id = 0;
    return new Promise((resolve, reject) => {
        let products = [];
        urlList.forEach((item) => {
            request("https://www.thegioididong.com" + item.url).then((body) => {
                const $ = cheerio.load(body);
                let result = {};
                $(".item").each((index, el) => {
                    let url = $(el).find("a")[0].attribs.href;
                    let slug = url.replace("/dtdd/", "");

                    let name = $(el).find("h3").text();
                    let thumb = $(el).find("a > img");

                    let priceNew = 0;
                    let priceOld = 0;
                    let info = "";
                    thumb.each((index, el) => {
                        let elClass = el.attribs.class || "";
                        if (elClass.includes("icon")) {
                            return;
                        }
                        if ({ ...el.attribs }["data-original"]) {
                            return (thumb = { ...el.attribs }["data-original"]);
                        } else {
                            return (thumb = { ...el.attribs }.src);
                        }
                    });

                    $(el)
                        .find("a > .price > strong")
                        .each((index, el) => {
                            priceNew = Number.parseInt(
                                el.children[0].data
                                    .replace("₫", "")
                                    .replace(/\.+/g, "")
                            );
                        });
                    $(el)
                        .find("a > .price > span")
                        .each((index, el) => {
                            priceOld = Number.parseInt(
                                el.children[0].data
                                    .replace("₫", "")
                                    .replace(/\.+/g, "")
                            );
                        });
                    info = encodeURI($(el).find("a > .bginfo").html());
                    result = {
                        id: ++id,
                        categoryId: item.catId,
                        name: name,
                        slug: slug,
                        priceNew: priceNew,
                        priceOld: priceOld,
                        thumb: thumb,
                        info: info,
                        likes: Math.floor(Math.random() * 1000) + 100,
                        quantity: Math.floor(Math.random() * 100) + 1,
                        url: url,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    };
                    console.log(result.id);
                    db.products.push(result);
                });
            });
        });
        console.log("Wait 10s to complete!");
        setTimeout(() => {
            resolve();
        }, 10000);
    }).then(() => {
        fs.writeFile("crawl-tgdd-db.json", JSON.stringify(db), () =>
            console.log("Write done!")
        );
    });
};
