import { FileText, Shield, Truck, CreditCard, AlertCircle, ShoppingBag, RefreshCw } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'አጠቃላይ ውሎች',
      content: 'ይህን ድረ-ገፅ በመጠቀምዎ እነዚህን ውሎች እና ቅድመ ሁኔታዎች ተቀብለዋል ማለት ነው። ካልተስማሙ እባክዎ ድረ-ገፃችንን አይጠቀሙ።'
    },
    {
      icon: ShoppingBag,
      title: 'የትዕዛዝ ሂደት',
      content: 'ትዕዛዞች በመስመር ላይ በኩል ይደረጋሉ። ትዕዛዝ ካስገቡ በኋላ የማረጋገጫ ኢሜይል ይላክልዎታል። ትዕዛዝዎ ከ500 ብር በታች ከሆነ አይቀበልም።'
    },
    {
      icon: Truck,
      title: 'ማድረስ',
      content: 'ማድረስ ከ30-60 ደቂቃ ይወስዳል። ለ5000 ብር በላይ ትዕዛዞች ነጻ ነው። በተለመደው ሁኔታ 50 ብር ነው።'
    },
    {
      icon: CreditCard,
      title: 'ክፍያ',
      content: 'ካሽ ኦን ደሊቨሪ (COD) ብቻ እንቀበላለን። ምርቱ እስኪደርስዎት ድረስ አይከፍሉም።'
    },
    {
      icon: RefreshCw,
      title: 'መመለስ እና መተካት',
      content: 'የተበላሹ ወይም ያልተጠበቁ ምርቶች በ24 ሰዓት ውስጥ መመለስ ይቻላል። እባክዎ ደንበኛ አገልግሎት ያግኙ።'
    },
    {
      icon: Shield,
      title: 'የግላዊነት',
      content: 'የግል መረጃዎ እንደ ግላዊነት ፖሊሲያችን መሰረት ይያዛል። መረጃዎን ለሶስተኛ ወገን አንሸጥም።'
    }
  ]

  return (
    <div className="container-custom py-6 sm:py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">ውሎች እና ቅድመ ሁኔታዎች</h1>
        <p className="text-gray-600">
          የተሻሻለው: {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800 text-sm">
              እባክዎ እነዚህን ውሎች በጥንቃቄ ያንብቡ። ይህን ድረ-ገፅ በመጠቀምዎ ሙሉ በሙሉ ተስማምተዋል ማለት ነው።
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

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>ለተጨማሪ መረጃ እባክዎ ደንበኛ አገልግሎታችንን ያግኙ።</p>
      </div>
    </div>
  )
}