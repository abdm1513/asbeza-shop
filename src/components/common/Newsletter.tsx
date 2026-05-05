import { Send, MessageSquare } from 'lucide-react'
import { Button } from '../ui/Button'

export function Newsletter() {
  const TELEGRAM_LINK = "https://t.me" // Replace with your link

  const handleJoinClick = () => {
    window.open(TELEGRAM_LINK, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative overflow-hidden bg-[#229ED9]/10 rounded-3xl p-6 sm:p-10 my-10 border border-[#229ED9]/20">
      {/* Decorative Background Icon */}
      <div className="absolute -right-10 -bottom-10 text-[#229ED9]/5 -rotate-12">
        <Send size={200} />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#229ED9] text-white px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            <MessageSquare size={14} />
            <span>ቴሌግራም ይቀላቀሉ</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 leading-tight">
             ፈጣን መረጃዎችን እና <span className="text-[#229ED9]">ልዩ ቅናሾችን</span> ያግኙ
          </h3>
          
          <p className="text-gray-600 text-sm sm:text-base max-w-md">
            በቴሌግራም ቻናላችን አዳዲስ ምርቶች በደረሱ ቁጥር እና ታላቅ ቅናሾችን ስናደርግ ፈጣን ማሳሰቢያ ይደርሶዎታል።
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-3 min-w-[240px]">
          <Button 
            onClick={handleJoinClick}
            className="w-full h-14 bg-[#229ED9] hover:bg-[#1c84b5] text-white text-lg font-bold rounded-2xl shadow-xl shadow-[#229ED9]/20 flex items-center justify-center gap-3 group transition-all"
          >
            <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            ቻናሉን ይቀላቀሉ
          </Button>
          
          <p className="text-[11px] text-gray-400 font-medium italic">
            ከ 5,000+ በላይ ደንበኞችን ይቀላቀሉ
          </p>
        </div>
      </div>
    </div>
  )
}
