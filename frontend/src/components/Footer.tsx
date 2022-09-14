import "./Footer.css"

export default function Footer() {

    return (
        <footer>
            <div className="footer-content">
                <p>copyright & copy;2022
                    <a
                        href="https://github.com/asrarbutt"
                        target="_blank"
                        rel={"noreferrer"}
                    > Asrar Ahmad Butt
                    </a>
                </p>
                <ul className="footer-home">
                    <li>
                        <a
                            href="https://myfinance-manager.herokuapp.com/"
                            target="_blank"
                            rel={"noreferrer"}
                        >
                            <i
                                className="HomeBottom">
                            </i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
