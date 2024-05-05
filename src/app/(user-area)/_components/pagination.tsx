import Image from 'next/image'
import { useState } from 'react'

export default function Pagination({
	filter,
	pagingObject,
	onChangePageSize,
}: {
	filter: any
	pagingObject: any
	onChangePageSize: (val: any) => void
}) {
	console.log('pagingObject', pagingObject)

	return (
		<div className="w-full">
			<div className="grid grid-cols-2">
				<div className="col-start-2">
					<div className="flex flex-row justify-between items-center">
						<div className="flex flex-row items-center gap-4">
							<button
								disabled={!pagingObject.hasPreviousPage}
								onClick={() => onChangePageSize(filter.pageNumber - 1)}
								className={`relative aspect-square w-[3.125rem] ${
									!pagingObject.hasPreviousPage ? 'cursor-no-drop' : 'cursor-pointer'
								}`}
							>
								<Image fill src="./images/previous.svg" alt="previous"></Image>
							</button>
							<button
								disabled={!pagingObject.hasNextPage}
								onClick={() => onChangePageSize(filter.pageNumber + 1)}
								className={`flex flex-row items-center justify-around rounded-md w-[10rem] h-[3.125rem] bg-[#46B8E9] text-white ${
									!pagingObject.hasNextPage ? 'cursor-no-drop' : 'cursor-pointer'
								}`}
							>
								Next page{' '}
								<span className="inline-flex relative aspect-square w-[1.1875rem]">
									<Image fill src="./images/arrow-next.svg" alt="previous"></Image>
								</span>
							</button>
						</div>
						<div className="flex flex-row items-center">
							<p>Page</p>
							<input
								className="border border-[#CDCDCD] rounded-md w-[5.625rem] h-[3.125rem] mx-3 outline-none text-center"
								type="number"
								value={filter.pageNumber}
								onChange={(e) => onChangePageSize(+e.target.value)}
							/>
							<p>of {pagingObject?.totalPages}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
