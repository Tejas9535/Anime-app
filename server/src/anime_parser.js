import cheerio from "cheerio"
import axios from "axios"
import { BASE_URL } from "./common/constant.js";

export const scrapeAnimeCard = async ({url, page}) => {
    try {
        const mainPage = await axios.get(`${BASE_URL}/${url}`)
        const $ = cheerio.load(mainPage.data);
        const list = []

        $('div>.flw-item').each((i, el) => {
            console.log('getdata', [...new Set([
                $(el).find('.tick-item.tick-dub').first().text(),
                $(el).find('.tick-item.tick-dub').last().text()
            ])]);
            list.push({
                animeId: $(el).find('a').attr('href').split('/')[1].split('-episode-')[0],
                animeTitle: $(el).find('a').text(),
                episodeNum: $(el).find('.tick-item.tick-eps').text().trim(),
                subOrDub:[...new Set([
                    $(el).find('.tick-item.tick-dub').first().text(),
                    $(el).find('.tick-item.tick-dub').last().text()
                ])],
                animeImg: $(el).find('img').attr('data-src'),
                episodeUrl: BASE_URL + $(el).find('a').attr('href'),
                airedOn:$(el).find('.fdi-item').first().text(),
                episodeDuration:$(el).find('.fdi-item.fdi-duration').text(),
            });
        });
        return list
    } catch (error) {
        return error;
    }
}

// export default {}