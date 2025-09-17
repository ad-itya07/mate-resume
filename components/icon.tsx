import Image from "next/image"

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className = "", size = 24 }: IconProps) {
  return <Image src={`/${name}.svg`} alt={`${name} icon`} width={size} height={size} className={className} />
}
