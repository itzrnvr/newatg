import axios from 'axios';

export interface BitrateAndResolution {
    bitrate: number | null;
    width: number | null;
    height: number | null;
}

async function fetchVideoBitrateAndResolutions(
    url: string,
): Promise<BitrateAndResolution[]> {
    const response = await axios.get(url);

    const playlist = response.data;
    const lines = playlist.split('\n');

    // Filter lines starting with #EXT-X-STREAM-INF
    const streamInfLines = lines.filter((line: string) =>
        line.startsWith('#EXT-X-STREAM-INF'),
    );

    // Extract the bitrates and resolutions
    const infoArray = streamInfLines.map((line: string) => {
        const bandwidthMatch = line.match(/BANDWIDTH=(\d+)/);
        const resolutionMatch = line.match(/RESOLUTION=(\d+x\d+)/);
        let width: number | null = null;
        let height: number | null = null;

        if (resolutionMatch) {
            let dimensions = resolutionMatch[1].split('x');
            width = Number(dimensions[0]);
            height = Number(dimensions[1]);
        }

        return {
            bitrate: bandwidthMatch ? Number(bandwidthMatch[1]) : null,
            width,
            height,
        };
    });

    // We filter out data records where we were unable to determine the bitrate or resolution
    const validInfoArray = infoArray.filter(
        (data: {bitrate: undefined}) => data.bitrate !== undefined,
    ) as BitrateAndResolution[];

    return validInfoArray;
}

// Usage
export default fetchVideoBitrateAndResolutions;
