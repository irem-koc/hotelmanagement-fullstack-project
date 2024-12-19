type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; 2024 Hotel Management. All rights reserved.
        </p>
        <div className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="/privacy"
                className="hover:text-blue-300 transition duration-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-blue-300 transition duration-300"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-300 transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
