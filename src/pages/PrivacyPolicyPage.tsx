import { Shield, Database, Mail, UserCheck, Lock, Trash2, Globe } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: 'የምንሰበስበው መረጃ',
      content: 'ስም፣ ስልክ ቁጥር፣ አድራሻ እና የትዕዛዝ ታሪክ እንሰበስባለን። የክፍያ መረጃ አንሰበስብም ምክንያቱም ካሽ ኦን ደሊቨሪ ብቻ እንጠቀማለን።'
    },
    {
      icon: Shield,
      title: 'መረጃን እንዴት እንጠቀማለን',
      content: 'ትዕዛዞችን ለማካሄድ፣ እርዳታ ለመስጠት እና አገልግሎታችንን ለማሻሻል እንጠቀማለን። መረጃዎን ለማስታወቂያ አንጠቀምም።'
    },
    {
      icon: Lock,
      title: 'የመረጃ ደህንነት',
      content: 'መረጃዎን ካልተፈቀደ መድረስ ለመጠበቅ ዘመናዊ የደህንነት እርምጃዎችን እንጠቀማለን። ሁሉም መረጃ በደህንነት ይቀመጣል።'
    },
    {
      icon: UserCheck,
      title: 'የእርስዎ መብቶች',
      content: 'መረጃዎን የማግኘት፣ የማረም እና የመሰረዝ መብት አለዎት። እባክዎ ለማንኛውም ጥያቄ ያግኙን።'
    },
    {
      icon: Trash2,
      title: 'የመረጃ ማቆያ',
      content: 'መለያዎ ንቁ እስከሆነ ድረስ መረጃዎን እናቆይዋለን። መለያዎን ከሰረዙ በኋላ መረጃዎ ይወገዳል።'
    },
    {
      icon: Mail,
      title: 'እንዴት እንደሚያገኙን',
      content: `ስለ ግላዊነት ፖሊሲ ጥያቄ ካለዎት እባክዎ በ${import.meta.env.VITE_CONTACT_EMAIL || 'info@martsupermarket.com'} ያግኙን።`
    }
  ]

  return (
    <div className="container-custom py-6 sm:py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">የግላዊነት ፖሊሲ</h1>
        <p className="text-gray-600">
          የተሻሻለው: {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      <div className="bg-primary-50 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-gray-700">
              የእርስዎን ግላዊነት መጠበቅ ለእኛ ቅድሚያ የምንሰጠው ጉዳይ ነው። ይህ ፖሊሲ የግል መረጃዎን እንዴት እንደምንሰበስብ፣ እንደምንጠቀም እና እንደምንጠብቅ ያብራራል።
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <p className="text-gray-600 ml-11">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Globe size={16} />
          <span>ለተጨማሪ መረጃ እባክዎ ደንበኛ አገልግሎታችንን በስልክ ወይም በኢሜይል ያግኙ።</span>
        </div>
      </div>
    </div>
  )
}