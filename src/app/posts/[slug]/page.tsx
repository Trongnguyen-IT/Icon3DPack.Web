'use client'

import { usePathname } from 'next/navigation'

export default function Posts({ params }: { params: { slug: string } }) {
	const pathname = usePathname()

	const isContact = `/posts/contact` === pathname
	return !isContact ? (
		<div>
			<h1 className="text-3xl font-bold capitalize mb-5">{params.slug}</h1>
			<p className="mb-5 text-justify">
				Lorem ipsum dolor sit amet consectetur. Morbi dictum turpis quisque vel cursus eu elit.
				Etiam pharetra turpis quam nunc lorem commodo luctus. Id mauris habitant cursus dui nunc
				libero turpis. Nec donec mauris laoreet aliquam arcu sed urna. Ultricies vitae duis cras
				facilisis risus aenean volutpat purus morbi. Aliquet sed lobortis leo ultrices nisl eu. At
				id ut sed habitasse pellentesque at morbi integer. Velit et sit arcu amet. Tempus sagittis
				sed velit laoreet. Diam tellus fermentum cursus dignissim varius. Sed tincidunt amet elit
				luctus dictumst.
			</p>
			<h3 className="mb-5 text-lg font-bold">
				The standard Lorem Ipsum passage, used since the 1500s
			</h3>
			<p className="mb-5 text-justify">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<h3 className="mb-5 text-lg font-bold">1914 translation by H. Rackham</h3>
			<p className="mb-5 text-justify">
				But I must explain to you how all this mistaken idea of denouncing pleasure and praising
				pain was born and I will give you a complete account of the system, and expound the actual
				teachings of the great explorer of the truth, the master-builder of human happiness. No one
				rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who
				do not know how to pursue pleasure rationally encounter consequences that are extremely
				painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself,
				because it is pain, but because occasionally circumstances occur in which toil and pain can
				procure him some great pleasure. To take a trivial example, which of us ever undertakes
				laborious physical exercise, except to obtain some advantage from it? But who has any right
				to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences,
				or one who avoids a pain that produces no resultant pleasure?
			</p>
			<h3 className="mb-5 text-lg font-bold">
				Section 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot;, written by Cicero in 45 BC
			</h3>
			<p className="mb-5 text-justify">
				At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
				voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
				cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
				est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
				libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
				maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
				Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
				et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
				sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
				doloribus asperiores repellat.
			</p>
		</div>
	) : (
		<div>
			<h1 className="text-3xl font-bold capitalize mb-5">{params.slug}</h1>
			<div className="flex justify-center mb-12">
				<div className="basis-4/5">
					<p className="mb-5 text-lg font-bold text-center">Leave us a message</p>
					<p className="text-center">
						Feel free to ask us any questions including regarding pricing plans, licenses options or
						products itself. If you looking for custom design please use this contact form.
					</p>
				</div>
			</div>
			<div>
				<div className="grid grid-cols-4 gap-4">
					<input
						className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
						type="text"
						placeholder="Your name"
					/>
					<input
						className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
						type="text"
						placeholder="Email"
					/>
					<textarea
						className="col-start-2 col-span-2 border rounded-lg py-3 px-2 border-[#E7E7E7] outline-none"
						placeholder="Tell us all the things"
						rows={5}
					/>
					<button className="col-start-2 col-span-2 border rounded-lg bg-[#46B8E9]p y-3 text-white mt-5">
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}
