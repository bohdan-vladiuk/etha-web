// Import built-in types for API routes
import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import { FETCH_ALL_USER_TAGS, GET_ALL_POST_TAGS } from '../../services/API';
import api from '../../services/api-helper';
interface TagInterface {
    tag: string;
}

async function getPostData(): Promise<TagInterface[]> {
    let data: TagInterface[] = [];
    await api.get(GET_ALL_POST_TAGS).then(
        (response) => {
            data = response.data;
        },
        (err) => {
            data = [];
            console.log('Error: ', err);
        },
    );

    return data;
}
async function getUserData() {
    let data: TagInterface[] = [];
    await api.get(FETCH_ALL_USER_TAGS).then(
        (response) => {
            data = response.data;
        },
        (err) => {
            data = [];
            console.log('Error: ', err);
        },
    );

    return data;
}
export default async function SitemapGenerator(req: NextApiRequest, res: NextApiResponse) {
    if (!res) return {};
    try {
        // Set response header
        res.setHeader('content-type', 'application/xml');
        res.setHeader('Content-Encoding', 'gzip');

        // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
        // The readable stream it transforms must be in object mode.
        const smStream = new SitemapStream({
            hostname: 'https://etha.one',
        });

        const pipeline = smStream.pipe(createGzip());
        // Add any static entries here
        smStream.write({ url: '/', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.WEEKLY });
        smStream.write({ url: '/about-us', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.WEEKLY });
        smStream.write({
            url: '/press-release/etha-launch',
            lastmod: process.env.siteUpdatedAt,
            changefreq: EnumChangefreq.WEEKLY,
        });
        // smStream.write({ url: '/landing', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.WEEKLY });
        // smStream.write({ url: '/about-us', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY });
        // smStream.write({
        //     url: '/press-release/etha-launch',
        //     lastmod: process.env.siteUpdatedAt,
        //     changefreq: EnumChangefreq.MONTHLY,
        // });
        // smStream.write({ url: '/investments', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY });
        // smStream.write({
        //     url: '/political-timeline',
        //     lastmod: process.env.siteUpdatedAt,
        //     changefreq: EnumChangefreq.MONTHLY,
        // });
        // smStream.write({
        //     url: '/political-spectrum',
        //     lastmod: process.env.siteUpdatedAt,
        //     changefreq: EnumChangefreq.MONTHLY,
        // });
        smStream.write({
            url: '/privacy-policy',
            lastmod: process.env.siteUpdatedAt,
            changefreq: EnumChangefreq.MONTHLY,
        });
        smStream.write({
            url: '/terms-of-service',
            lastmod: process.env.siteUpdatedAt,
            changefreq: EnumChangefreq.MONTHLY,
        });
        smStream.write({ url: '/unsubscribe', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY });
        const postData = await getPostData();
        const userData = await getUserData();

        postData.forEach((post) => {
            smStream.write({
                url: `/post/${post.tag}`,
                lastmod: process.env.siteUpdatedAt,
                changefreq: EnumChangefreq.DAILY,
            });
        });

        userData.forEach((user) => {
            smStream.write({
                url: `/profile/${user.tag}`,
                lastmod: process.env.siteUpdatedAt,
                changefreq: EnumChangefreq.DAILY,
            });
        });

        smStream.end();

        // cache the response
        // streamToPromise.then(sm => sitemap = sm)
        streamToPromise(pipeline);
        // const sitemapOutput = (await streamToPromise(smStream)).toString();

        res.writeHead(200, {
            'Content-Type': 'application/xml',
        });
        // stream the response
        pipeline.pipe(res).on('error', (e) => {
            throw e;
        });
    } catch (e) {
        res.status(500).end();
    }
}
