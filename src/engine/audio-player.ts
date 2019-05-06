export class AudioPlayer {

    private _context : AudioContext;

    constructor(){
        this._context = new AudioContext();
    }

    public async loadAudio(filepath: string) {
        const response = await fetch(filepath);
        const arrayBuffer = await response.arrayBuffer();
        return this._context.decodeAudioData(arrayBuffer);
    }

    public playAudio(source: AudioBuffer){
        const trackSource = this._context.createBufferSource();
        trackSource.buffer = source;
        trackSource.connect(this._context.destination)
        trackSource.start();
        return trackSource;
    }

    public stopAudio(source: AudioBufferSourceNode){
        source.stop();
    }
}