import m3u8Parser from 'm3u8-parser';
import axios, {AxiosResponse} from 'axios';

export const baseURL: string =
    'https://junglebookpune.org/test_awaken_genius/videos/speed_reading/'; // Replace with your URL

export const getContent = async (url: string): Promise<string> => {
    let response: AxiosResponse<string>;
    try {
        response = await axios.get(url);
    } catch (error: any) {
        console.error(`Failed to get content from: ${url}`, error.message);
        throw error;
    }
    return response.data;
};

export const extractPartBeforeSlash = (str: string): string => {
    const parts: string[] = str.split('/');
    return parts[0];
};

export const processPlaylist = async (response: string): Promise<void> => {
    const parser = new m3u8Parser.Parser();
    parser.push(response);
    parser.end();

    const playlist = parser.manifest;
    if (!playlist.playlists) return;

    console.log('Is master playlist');

    for (const variant of playlist.playlists) {
        if (variant.attributes.RESOLUTION.height === 360) {
            const variantContent: string = await getContent(
                baseURL + variant.uri,
            );
            const variantParser = new m3u8Parser.Parser();
            variantParser.push(variantContent);
            variantParser.end();

            const mediaPlaylist = variantParser.manifest;
            let totalSegments: number = mediaPlaylist.segments.length;
            let downloadedSegments: number = 0;

            for (const segment of mediaPlaylist.segments) {
                const segmentURI: string = `${baseURL}${extractPartBeforeSlash(
                    variant.uri,
                )}/${segment.uri}`;

                console.log('Segment URL:', segmentURI);
                const segmentContent: string = await getContent(segmentURI);
                console.log('Segment content:', segmentContent);

                downloadedSegments += 1;

                const progress: number =
                    (downloadedSegments / totalSegments) * 100;
                console.log(`Download progress: ${progress.toFixed(2)}%`); //<-- Display the progress
            }
        }
    }
};

export const download = async (): Promise<void> => {
    const playlistContent: string = await getContent(baseURL + 'master.m3u8');
    await processPlaylist(playlistContent);
};

download();
