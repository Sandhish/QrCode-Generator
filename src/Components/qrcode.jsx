import './qrcode.css';
import { useState } from "react";

const QrCode = () => {
    const [img, imgSet] = useState("");
    const [loading, loadingSet] = useState(false);
    const [qrValue, qrSet] = useState("");
    const [sizeValue, setSize] = useState("");
    const [downloading, setDownloading] = useState(false);
    const [err, setErr] = useState(false);

    async function Generator() {
        if (!qrValue) {
            setErr("Please enter the URL");
        } else {
            setErr("");
            loadingSet(true);
            setTimeout(() => {
                try {
                    imgSet(`https://api.qrserver.com/v1/create-qr-code/?size=${sizeValue}x${sizeValue}&data=${encodeURIComponent(qrValue)}`);
                }
                catch (error) {
                    alert(error);
                }
                finally {
                    loadingSet(false);
                }
            }, 2000);
        }
    }

    function Download() {
        setDownloading(true);
        fetch(img)
            .then((res) => res.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => alert(error))
            .finally(() => {
                setDownloading(false);
            });
    }

    return (
        <div className="qrbody">
            <div className="upperbody">
                <div className="heading">QR Generator</div>
                {img && <img src={img} alt="QR Code" />}
            </div>

            <label htmlFor="url">Enter URL :</label>
            <input type="url" id="url" value={qrValue} placeholder="Enter URL..." onChange={(e) => qrSet(e.target.value)} required />
            <label htmlFor="size">Enter Size :</label>
            <input type="number" id="size" value={sizeValue} placeholder="Enter Size of QR..." onChange={(e) => setSize(e.target.value)} />

            <div className="buttons">
                <button className="generate" onClick={Generator} disabled={loading} > Generate </button>
                <button className="download" onClick={Download} disabled={!img || downloading} > Download </button>
            </div>

            {err && <p className="error">{err}</p>}

            {(loading || downloading) && (
                <div className="overlay">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
}

export default QrCode;
