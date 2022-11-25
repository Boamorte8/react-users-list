import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
	const [openedDropdown, setOpenedDropdown] = useState(false);
	const dropdownRef = useRef(null);

	const openDropdown = () => setOpenedDropdown(true);
	const closeDropdown = () => setOpenedDropdown(false);

	useEffect(() => {
		if (!openedDropdown) return;

		const handleClickOutside = event => {
			if (!dropdownRef.current.contains(event.target)) closeDropdown();
		};
		document.addEventListener('click', handleClickOutside, { capture: true });
		return () => {
			document.removeEventListener('click', handleClickOutside, {
				capture: true
			});
		};
	}, [openedDropdown]);

	return {
		openedDropdown,
		dropdownRef,
		openDropdown,
		closeDropdown
	};
};
