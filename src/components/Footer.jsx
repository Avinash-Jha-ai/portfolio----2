export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__name">Avinash Jha</div>
            <div className="footer__copy" style={{ textAlign: 'center' }}>
                Designed &amp; Built with ❤️ &amp; ✨
            </div>
            <div className="footer__copy">
                &copy; {new Date().getFullYear()} All rights reserved
            </div>
        </footer>
    )
}
