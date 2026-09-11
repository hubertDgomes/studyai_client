import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t border-[#52614a] bg-[#2f4232] px-6 py-6 text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
                <p>Created by <span className="font-semibold text-[#d6dfca]">Hubert Dhrubo Gomes</span></p>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/hubertDgomes" className="transition-colors hover:text-[#d6dfca]"  target='_blank'>
                        GitHub
                    </a>
                    <span aria-hidden="true" className="h-4 w-px bg-[#61715b]" />
                    <a href="https://linkedin.com/in/hubertdgomes" className="transition-colors hover:text-[#d6dfca]"  target='_blank'>
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer