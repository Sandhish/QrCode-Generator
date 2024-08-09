import './qrcode.css'
import { useState } from "react"

const QrCode = () => {
    const [img, imgSet] = useState("");
    const [loading, loadingSet] = useState(false);
    const [qrValue, qrSet] = useState("");
    const [sizeValue, setSize] = useState("");
    async function Generator() {
        loadingSet(true)
        try {
            imgSet(`https://api.qrserver.com/v1/create-qr-code/?size=${sizeValue}x${sizeValue}&data=${encodeURIComponent(qrValue)}`)
        }
        catch (error) {
            alert(error);
        }
        finally {
            loadingSet(false)
        }
    }
    function Download() {
        fetch(img)
            .then((res) => res.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild("link");
            })
    }
    return (
        <div className="qrbody">
            <div className="upperbody">
                <div className="heading">QR Generator</div>
                {img && <img src={img} alt="" />}
            </div>
            <label htmlFor="url">Enter URL :</label>
            <input type="url" id="url" value={qrValue} placeholder="Enter URL..." onChange={(e) => qrSet(e.target.value)} />
            <label htmlFor="size">Enter Size :</label>
            <input type="number" id="size" value={sizeValue} placeholder="Enter Size of QR..." onChange={(e) => setSize(e.target.value)} />
            <div className="buttons">
                <button className="generater" onClick={Generator} disabled={loading}>Generate</button>
                <button className="download" onClick={Download} disabled={!img}>Download</button>
            </div>
        </div>
    )
}

export default QrCode
