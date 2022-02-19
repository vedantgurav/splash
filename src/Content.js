import React, { useEffect } from "react";
import "./index.css";
import gsap from "gsap";

export default function Content(props) {
    const { colors, clear, paint, slowSelect, pickImage } = props;

    useEffect(() => {
        var tl = gsap.timeline();
        tl.from(document.getElementById("fullstop"), 0.5, { opacity: 0 }).delay(
            1
        );
    }, []);

    return (
        <div className="col-md-6" id="content">
            <div className="row">
                <div className="col-md-12" id="subheading">
                    <p style={{ color: colors.secondary }}>make a</p>
                </div>
                <div className="col-md-12" id="heading">
                    <p style={{ color: colors.primary }}>
                        Splash
                        <span style={{ color: colors.primary }} id="fullstop">
                            .
                        </span>
                    </p>
                </div>
            </div>

            <div
                className="row"
                id="description"
                style={{ color: colors.secondary }}
            >
                <p className="col-md-12">
                    Lend a fresh Splash of{" "}
                    <span style={{ color: colors.colored }}>colour</span> to
                    this page and brighten it up.
                </p>
                <p className="col-md-12">
                    Select an Image to see its colours applied to this page.
                </p>
            </div>
            <div className="row justify-content-center">
                <div className="" id="button">
                    <input
                        type="file"
                        id="input"
                        name="img"
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    <div
                        className={slowSelect ? "slow-select" : ""}
                        id="select"
                        style={{
                            color: colors.background,
                            backgroundColor: colors.primary,
                        }}
                        onClick={() => {
                            pickImage();
                        }}
                    >
                        Select Image
                    </div>
                    <div
                        className={paint ? "" : "poof"}
                        style={{ color: colors.primary }}
                        id="clear"
                        onClick={() => {
                            clear();
                        }}
                    >
                        <u>Clear</u>
                    </div>
                </div>
            </div>
        </div>
    );
}
