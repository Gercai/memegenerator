import {useEffect, useRef,  useState} from 'react';
import {nextMeme, lastMeme, randomMeme} from '../functions/memeFunctions';
import domtoimage from 'dom-to-image';


export const MemeGenerator = () => {

    const [memes,setMemes] = useState("");
    const [curMeme, setCurMeme] = useState("");
    const [text,setText] = useState(["placeholder1","placeholder2"]);
    const[number, setNumber] = useState(0);
    // URL.createObjectURL()


 

    useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes").then((res) => res.json() ).then(({data}) => {
        setMemes(data.memes)
        setCurMeme(memes[number])

        const inputElement = document.getElementById("inputImg");
        inputElement.addEventListener("change", handleFiles, false);
    });
    },[]);

    useEffect(() => {
        setCurMeme(memes[number]);
        // console.log(curMeme);
    },[number])

    useEffect(() => {
    },[text])

    function handleFiles() {
        const fileList = this.files;
        console.log(fileList[0]);
        let url = URL.createObjectURL(fileList[0]);
        let name = fileList[0].name;
        let newMeme = {name: name, url: url};
        setCurMeme(newMeme);
    }

    const clear = () => {
        setCurMeme();
        setText(["",""])
        document.getElementById('text0').value = '';
        document.getElementById('text1').value = '';

    }

    const domToImg = () => {
       
        domtoimage.toJpeg(document.getElementById('meme'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
    }
 

    const changeText = (event) => {
        const textPick = event.target.name.substring(event.target.name.length - 1, event.target.name.length);
        const newTextArray = [...text];
        newTextArray[textPick] = event.target.value;
        setText(newTextArray);
    }
    
    return(
    <div className="flexBox memeGenerator">
    <div className="memes">   
        <p>{curMeme?.name}</p>
        <div className="imageContainer" id="meme">
            <p className="textTop">{text[0]}</p>
            <p className="textBottom">{text[1]}</p>
        <img src={curMeme?.url} alt="" />
        </div>
        <div>
        <button onClick={() =>  lastMeme(setNumber, number)}>back</button>
        <button onClick={() =>  nextMeme(setNumber,number)}>next</button>
        <button onClick={() =>  randomMeme(setNumber,number)}>random</button>
        <input type="file" id="inputImg" multiple />
        <button onClick={() => domToImg()}>download</button>
        <button onClick={() => clear()}>clear</button>
        </div>
    </div>

    <div className="textForm flexBox columnFlex">
       Text1 <input type="text" id="text0" name="text0" placeholder={text[0]} onChange={(e) => changeText(e)} />
       Text2 <input type="text" id="text1" name="text1" placeholder={text[1]} onChange={(e) => changeText(e)}/>
    </div>
    </div>)
}