/* global document */

import React from "react";
import ReactDOM from "react-dom";
import { ext, sendMessage, MSGType, waitSeconds } from "utils";
import MessageListener from "./messageListener";

// import "./content.css";

class Main extends React.Component {
    render() {
        return (
            <div className="my-extension">
                {/* <h1>Hello world - My React Extension</h1> */}
            </div>
        );
    }
}

(async function initialize() {
    try {
        const authStatus = await sendMessage(MSGType.CHECK_AUTH);
        if (!authStatus) {
            await waitSeconds(10);
            initialize();
            return;
        }

        //Set up message listener
        ext.runtime.onMessage.addListener(MessageListener);

        //Set up extension root
        const app = document.createElement("div");
        app.id = "extension-root";
        document.body.appendChild(app);
        ReactDOM.render(<Main />, app);
    } catch (err) {
        console.log("Error in Initialize of content script => ", err);
        initialize();
        return;
    }
})();
