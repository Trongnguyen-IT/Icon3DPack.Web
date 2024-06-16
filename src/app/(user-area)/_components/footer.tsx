import { getAll } from '@/services/posts'
import Image from 'next/image'
import Link from 'next/link'
import FooterClient from './footer-client'
import Donate from './donate'

export default async function Footer() {
	const icons = ['Figma', 'Dribbble', 'Behance', 'Pinterest', 'Instagram', 'Youtube'].map(
		(p) => `../../../images/${p}.svg`
	)
	const {
		status,
		data: {
			result: { items },
		},
	} = await getAll()

	return (
		<footer className="bg-black text-white">
			<div className="container mx-auto py-20">
				<div className="flex flex-row items-center">
					<div className="basis-3/4">
						<div className="flex flex-col">
							<Link href="." className="flex aspect-[186/40] relative max-w-[150px] mb-4">
								<Image
									src={'../../../images/logo-footer.svg'}
									fill
									style={{ objectFit: 'contain' }}
									alt="3DIconPack"
								/>
							</Link>
							<FooterClient initialPost={items} />
						</div>
					</div>
					<div className="basis-1/4">
						<div className="flex flex-col">
							<p className="font-bold mb-4">Connect with us</p>
							<ul className="grid grid-cols-6 gap-1">
								{icons.map((p: string, index: number) => {
									return (
										<li key={index} className="">
											<Link href="." className="w-10 h-10 inline-flex relative aspect-[1/1]">
												<Image src={p} fill style={{ objectFit: 'contain' }} alt={p} />
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Donate />
		</footer>
	)
}
