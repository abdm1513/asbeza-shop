import { Store, Award, Users, Truck, Clock, Shield, FileText, HelpCircle, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const features = [
    {
      icon: Store,
      title: 'ጥራት ያላቸው ምርቶች',
      description: 'ሁሉም ምርቶቻችን ከታመኑ አቅራቢዎች የሚመጡ እና ጥብቅ የጥራት ቁጥጥር ያላቸው ናቸው።'
    },
    {
      icon: Truck,
      title: 'ፈጣን ማድረስ',
      description: 'ትዕዛዝዎን በ30-60 ደቂቃ ውስጥ በርዎ ላይ እናደርሳለን።'
    },
    {
      icon: Clock,
      title: 'ምቹ ሰዓታት',
      description: 'ከጠዋቱ 8:00 እስከ ምሽቱ 10:00 ድረስ ክፍት ነን።'
    },
    {
      icon: Shield,
      title: 'ደህንነቱ የተጠበቀ ክፍያ',
      description: 'ካሽ ኦን ደሊቨሪ ብቻ - ምርቱ እስኪደርስዎት ድረስ አይከፍሉም።'
    },
    {
      icon: Award,
      title: 'ሽልማት አሸናፊ',
      description: 'በ2023 እና 2024 ምርጥ የመስመር ላይ ግሮሰሪ ተመርጠናል።'
    },
    {
      icon: Users,
      title: 'ደንበኛ ተኮር',
      description: 'ደንበኞቻችን ቅድሚያ የምንሰጣቸው ናቸው። 24/7 ደንበኛ አገልግሎት እንሰጣለን።'
    }
  ]

  const legalLinks = [
    { icon: HelpCircle, title: 'እገዛ እና ጥያቄዎች', href: '/help-faqs', description: 'ተደጋጋሚ ጥያቄዎች መልሶቻቸውን ያግኙ' },
    { icon: FileText, title: 'ውሎች እና ቅድመ ሁኔታዎች', href: '/terms', description: 'የአገልግሎት ውሎቻችንን ይመልከቱ' },
    { icon: Lock, title: 'የግላዊነት ፖሊሲ', href: '/privacy-policy', description: 'የግል መረጃዎ እንዴት እንደሚያዝ ይወቁ' }
  ]

  return (
    <div className="container-custom py-6 sm:py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">ስለ እኛ</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ማርት ሱቅ በኢትዮጵያ ውስጥ ጥራት ያላቸውን የምግብ እና የቤት እቃዎች በተመጣጣኝ ዋጋ ለማቅረብ የተቋቋመ ዘመናዊ የመስመር ላይ ግሮሰሪ ነው።
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ተልዕኮአችን</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            ለደንበኞቻችን ጥራት ያላቸውን ምርቶች በፍጥነት እና በአስተማማኝ ሁኔታ በማድረስ የምግብ ግዢ ልምድን ቀላል እና አስደሳች ማድረግ ነው።
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">ለምን እኛን መምረጥ አለብዎት?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Legal Links Section */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">ጠቃሚ መረጃዎች</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4 group-hover:bg-primary transition">
                <link.icon className="w-6 h-6 text-primary group-hover:text-white transition" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{link.title}</h3>
              <p className="text-gray-600 text-sm">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-gray-400 mt-1">ሰራተኞች</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">1000+</div>
            <div className="text-sm text-gray-400 mt-1">ምርቶች</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">5000+</div>
            <div className="text-sm text-gray-400 mt-1">ደስተኛ ደንበኞች</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">30-60</div>
            <div className="text-sm text-gray-400 mt-1">ደቂቃ ማድረስ</div>
          </div>
        </div>
      </div>
    </div>
  )
}