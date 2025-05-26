import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    waterBackground: new ImageSource('images/castleBackground.png'),
    Fish: new ImageSource('images/fish.png'),
    Fish1: new ImageSource('images/fish1.png'),
    Arrow: new ImageSource('images/arrow.png'),
    Floor: new ImageSource('images/floor.jpg'),
    Crunch: new Sound('sounds/crunch.mp3'),
    UpHeavtt: new FontSource('fonts/upheavtt.ttf')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }