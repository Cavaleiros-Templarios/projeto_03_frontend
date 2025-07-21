import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

function Footer() {
  return (
    <div className="
        
        py-6
        md:py-9
        lg:py-12
        text-center 
        shadow-md border-t border-gray-200">
        <p className="
        text-sm
        text-blue-900
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