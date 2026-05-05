import { useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { APP_CONFIG } from '../../config/appConfig'
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

function ScrollToTopLink({ to, children }: { to: string; children: React.ReactNode }) {
  const navigate = useNavigate()
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <a href={to} onClick={handleClick} className="hover:text-primary transition">
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">ማርት ሱቅ</h3>
            <p className="text-gray-400 text-sm">
              ጥራት ያላቸው ምርቶች በተመጣጣኝ ዋጋ በርከት ያሉ ምርጫዎች
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">ፈጣን አገናኞች</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><ScrollToTopLink to="/about">ስለ እኛ</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/contact">አግኙን</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/help-faqs">እገዛ እና ጥያቄዎች</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/terms">ውሎች እና ቅድመ ሁኔታዎች</ScrollToTopLink></li>
              <li><ScrollToTopLink to="/privacy-policy">የግላዊነት ፖሊሲ</ScrollToTopLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">አግኙን</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>{APP_CONFIG.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>{APP_CONFIG.contactEmail}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{APP_CONFIG.address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">ማህበራዊ ሚዲያ</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition">
                <FaXTwitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ማርት ሱቅ. ሁሉም መብቶች ተጠብቀዋል።</p>
        </div>
      </div>
    </footer>
  )
}