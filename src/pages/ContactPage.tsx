import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { APP_CONFIG } from '../config/appConfig'
import toast from 'react-hot-toast'
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('መልእክትዎ በተሳካ ሁኔታ ተልኳል!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('የሆነ ስህተት ተከስቷል። እባክዎ ይሞክሩ')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    { icon: Phone, title: 'ስልክ', details: [APP_CONFIG.contactPhone, '+251-XXX-XXX-XXX'] },
    { icon: Mail, title: 'ኢሜይል', details: [APP_CONFIG.contactEmail, 'support@martsupermarket.com'] },
    { icon: MapPin, title: 'አድራሻ', details: [APP_CONFIG.address] },
    { icon: Clock, title: 'የስራ ሰዓት', details: ['ከሰኞ - ቅዳሜ: 8:00 - 22:00', 'እሁድ: 9:00 - 21:00'] }
  ]

  return (
    <div className="container-custom py-6 sm:py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">አግኙን</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ማንኛውም ጥያቄ ወይም አስተያየት ካለዎት እባክዎ ያግኙን። በተቻለ ፍጥነት ምላሽ እንሰጥዎታለን።
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-800">{info.title}</h3>
              </div>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 text-sm ml-11">{detail}</p>
              ))}
            </div>
          ))}
          
          {/* Social Media */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-3">ማህበራዊ ሚዲያ</h3>
            <div className="flex gap-3 ml-2">
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition">
                <FaXTwitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">መልእክት ይላኩልን</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="ሙሉ ስም"
                  placeholder="ስምዎን ያስገቡ"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="ኢሜይል"
                  type="email"
                  placeholder="ኢሜይልዎን ያስገቡ"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <Input
                label="ርዕስ"
                placeholder="የመልእክት ርዕስ"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">መልእክት</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                  placeholder="መልእክትዎን ያስገቡ..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" isLoading={isLoading} fullWidth>
                <Send size={18} className="mr-2" />
                መልእክት ላክ
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-8">
        <div className="bg-gray-200 rounded-xl overflow-hidden h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0!2d38.7578!3d9.0300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnNDguMCJOIDM4wrA0NScyOC4wIkU!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Store Location"
            ></iframe>
        </div>
      </div>
    </div>
  )
}