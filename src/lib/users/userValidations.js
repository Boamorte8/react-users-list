const REGEX = {
	USERNAME: /^[a-z\d]+$/,
	START_WITH_NUMBER: /^[\d]/,
	NAME: /^[a-záéíóú\s-]+$/i
};

export const validateName = name => {
	if (name.length < 2 || name.length > 30)
		return 'Name must be between 2 and 30 characters';
	if (!REGEX.NAME.test(name))
		return 'Only allowed lowercase letters, spaces, and hyphens';
	if (name.includes('--')) return 'Double hyphen not allowed';
	if (name.includes('  ')) return 'Double space not allowed';

	const splittedName = name.split(' ');
	for (const word of splittedName) {
		if ((!!word && word.startsWith('-')) || word.endsWith('-'))
			return 'Start or ends with hyphen not allowed';
	}
};

export const validateUsername = username => {
	if (username.length < 6 || username.length > 15)
		return 'Username must be between 6 and 15 characters';
	if (!REGEX.USERNAME.test(username))
		return 'Only allowed lowercase letters and numbers';
	if (REGEX.START_WITH_NUMBER.test(username))
		return 'Not allowed start with numbers';
};
