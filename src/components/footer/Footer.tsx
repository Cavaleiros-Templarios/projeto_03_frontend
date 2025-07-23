import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

function Footer() {
  return (
    <div className="
      bg-[#FFFFFF]
      dark:bg-[#0d0d0f]
        py-6
        md:py-9
        lg:py-12
        text-center 
        shadow-[0_-4px_12px_rgba(0,0,0,0.05)]
        dark:shadow-[-0_-4px_12px_rgba(255,255,255,0.06)]
        border-t border-[#dadada] dark:border-[#4b4b4b]">
        <p className="
        text-sm
        text-[#1E9FFF]
        ">
        © 2025 Feito por Cavaleiros Templários SA. Todos os direitos reservados.
        </p>
        <div className="
            flex 
            justify-center 
            gap-6 mt-4
            ">
            <a href="https://allmylinks.com/grupo03" target="_blank"> 
              <LinkedinLogo size={32} color="#006CFF" /> 
            </a>
            <a href="https://allmylinks.com/tsydxyysudys" target="_blank">
              <GithubLogo size={32} color="#006CFF" />
            </a>
        </div>
    </div>
  )
}

export default Footer