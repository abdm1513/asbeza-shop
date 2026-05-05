import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Package, CreditCard, Truck, Clock, RefreshCw, Shield } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
  icon: any
}

export default function HelpFaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const faqs: FAQItem[] = [
    {
      category: 'orders',
      icon: Package,
      question: 'ትዕዛዝ እንዴት ማስገባት እችላለሁ?',
      answer: 'ትዕዛዝ ለማስገባት የሚፈልጉትን ምርት ወደ ጋሪ ያክሉ፣ ከዚያ ወደ ጋሪ ገፅ በመሄድ ትዕዛዝዎን ያረጋግጡ እና "ትዕዛዝ አስገባ" ቁልፍን ይጫኑ።'
    },
    {
      category: 'delivery',
      icon: Truck,
      question: 'ማድረስ ምን ያህል ጊዜ ይወስዳል?',
      answer: 'ማድረስ በአማካይ ከ30 እስከ 60 ደቂቃ ይወስዳል። ሁኔታዎች እንደ ቦታ እና የትራፊክ መጨናነቅ ሊለያይ ይችላል።'
    },
    {
      category: 'payment',
      icon: CreditCard,
      question: 'ምን አይነት የክፍያ ዘዴዎችን ትቀበላላችሁ?',
      answer: 'በአሁኑ ጊዜ ካሽ ኦን ደሊቨሪ (COD) ብቻ እንቀበላለን። በቅርቡ ተጨማሪ የክፍያ ዘዴዎችን ለማክበር እየሰራን ነው።'
    },
    {
      category: 'returns',
      icon: RefreshCw,
      question: 'ምርት መመለስ እችላለሁን?',
      answer: 'አዎ፣ ምርቱ የተበላሸ ወይም ያልተጠበቀ ከሆነ በ24 ሰዓት ውስጥ መመለስ ይችላሉ። እባክዎ ደንበኛ አገልግሎታችንን ያግኙ።'
    },
    {
      category: 'orders',
      icon: Package,
      question: 'ትዕዛዜን መሰረዝ እችላለሁን?',
      answer: 'አዎ፣ ትዕዛዝዎ "በመጠባበቅ ላይ" ሁኔታ ላይ እስካለ ድረስ መሰረዝ ይችላሉ። በትዕዛዝ ዝርዝር ገፅ ላይ "ሰርዝ" ቁልፍን ይጫኑ።'
    },
    {
      category: 'delivery',
      icon: Clock,
      question: 'ለማድረስ የምፈልገውን ሰዓት መምረጥ እችላለሁን?',
      answer: 'አዎ፣ በቼክአውት ጊዜ "በተወሰነ ሰዓት" መምረጥ ይችላሉ እና የሚፈልጉትን ቀን እና ሰዓት መምረጥ ይችላሉ።'
    },
    {
      category: 'payment',
      icon: Shield,
      question: 'ክፍያዬ ደህንነቱ የተጠበቀ ነው?',
      answer: 'አዎ፣ ካሽ ኦን ደሊቨሪ ስለምንጠቀም ምርቱ እስኪደርስዎት ድረስ አይከፍሉም። ይህ ሙሉ ደህንነትን ይሰጥዎታል።'
    },
    {
      category: 'returns',
      icon: RefreshCw,
      question: 'የተሳሳተ ምርት ቢልኩልኝ ምን ማድረግ አለብኝ?',
      answer: 'እባክዎ ወዲያውኑ ደንበኛ አገልግሎታችንን በስልክ ወይም በኢሜይል ያግኙ። ትክክለኛውን ምርት በፍጥነት እንልክልዎታለን።'
    }
  ]

  const categories = [
    { id: 'all', name: 'ሁሉም', icon: HelpCircle },
    { id: 'orders', name: 'ትዕዛዞች', icon: Package },
    { id: 'delivery', name: 'ማድረስ', icon: Truck },
    { id: 'payment', name: 'ክፍያ', icon: CreditCard },
    { id: 'returns', name: 'መመለስ', icon: RefreshCw }
  ]

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  return (
    <div className="container-custom py-6 sm:py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">እገዛ እና ጥያቄዎች</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ተደጋጋሚ ጥያቄዎች መልሶቻቸውን እዚህ ያግኙ። ሌላ ጥያቄ ካለዎት እባክዎ ያግኙን።
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
              activeCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <category.icon size={18} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl border overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <faq.icon size={20} className="text-primary" />
                </div>
                <span className="font-semibold text-gray-800">{faq.question}</span>
              </div>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-5 pt-0 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="text-center mt-12 p-8 bg-primary-50 rounded-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-2">አሁንም እርዳታ ይፈልጋሉ?</h3>
        <p className="text-gray-600 mb-4">ደንበኛ አገልግሎታችን ለእርዳታ ዝግጁ ነው።</p>
        <button className="btn-primary">ያግኙን</button>
      </div>
    </div>
  )
}