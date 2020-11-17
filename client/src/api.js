const fetchWithErrors = async (input, ...restParams) => {
	let res;
	try {
		res = await fetch(input, ...restParams);
	} catch {
		throw 'An error occurred';
	}

	if (res.ok) {
		return res;
	}
	throw await res.text();
};


export const getComments = () => fetchWithErrors('/comments').then(res => res.json());

export const insertComment = comment => fetchWithErrors('/comments', {
  method: 'POST',
  body: JSON.stringify(comment),
  headers: {'Content-Type': 'application/json'}
}).then(res => res.text());;