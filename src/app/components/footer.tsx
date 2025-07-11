import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="footer section bg-brand-primary py-12 dark:bg-bg-dark-card">
      <div className="footer__container container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer__content">
          <h3 className="footer__title text-xl font-semibold mb-4 text-white dark:text-text-dark-primary">
            Redes Sociales
          </h3>
          <ul className="footer__social flex gap-4">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link text-white hover:text-brand-primary dark:text-text-dark-primary dark:hover:text-brand-primary"
              >
                <Facebook className="text-2xl" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link text-white hover:text-brand-primary dark:text-text-dark-primary dark:hover:text-brand-primary"
              >
                <Twitter className="text-2xl" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link text-white hover:text-brand-primary dark:text-text-dark-primary dark:hover:text-brand-primary"
              >
                <Instagram className="text-2xl" />
              </a>
            </li>
          </ul>
        </div>
        {/* Add more footer content sections if needed based on original design */}
      </div>
      <div className="footer__copy text-center pt-8 border-t border-white border-opacity-10 dark:border-dark-border text-white text-opacity-60 dark:text-text-dark-secondary">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  )
}
