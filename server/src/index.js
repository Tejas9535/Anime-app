import express  from 'express'
import cors  from 'cors'
import { scrapeAnimeCard } from './anime_parser.js';
import { BASE_URL, ROUTES } from './common/constant.js';

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }

const app = express();
app.use(cors(corsOptions));

const port = process.env.PORT || 8080;

ROUTES.forEach((route) => {
    app.get(`/${route}`, async (req, res) => {
        try {
            const page = req.query?.page;
            // const type = req.query.type;
    
            console.log(req.query);
    
            const data = await scrapeAnimeCard({url:`${route}?page=${page}`,page:page});
    
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    });
})

// app.get('/', async (req, res) => {
//     try {
//         const page = req.query?.page;
//         // const type = req.query.type;

//         console.log(req.query);

//         const data = await scrapeAnimeCard(page);

//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// });

app.listen(port);
console.log(`Server started at http://localhost:${port}`);
