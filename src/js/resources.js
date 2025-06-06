import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

//recources = list of sprites, sfx and fonts
const Resources = {
    waterBackground: new ImageSource('images/castleBackground.png'),
    Fish: new ImageSource('images/fish.png'),
    Fish1: new ImageSource('images/fish1.png'),
    Arrow: new ImageSource('images/arrow.png'),
    Floor: new ImageSource('images/floor.jpg'),
    Heart: new ImageSource('images/heart.png'),
    Crunch: new Sound('sounds/crunch.mp3'),
    UpHeavtt: new FontSource('fonts/upheavtt.ttf')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }