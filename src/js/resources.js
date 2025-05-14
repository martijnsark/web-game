import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    waterBackground: new ImageSource('images/waterBackground.jpg'),
    Fish: new ImageSource('images/fish.png'),
    Fish1: new ImageSource('images/Fish1.png'),
    Fish2: new ImageSource('images/Fish2.png'),
    Fish3: new ImageSource('images/Fish3.png'),
    Fish4: new ImageSource('images/Fish4.png'),
    Crunch: new Sound('sounds/crunch.mp3'),
    UpHeavtt: new FontSource('fonts/upheavtt.ttf')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }