import _ from 'lodash';
import { useEffect, useState } from 'react';
import './bpl-settings.scss';
import Main from './Components/Main/Main';
import useWPAjax from './hooks/useWPAjax';
import { extractDefaultsNested } from './utils/functions';


const BPLSettings = props => {
	const { options, nonce } = props;
	const { data: dbData = null, isLoading, refetch, saveData } = useWPAjax('csbScrollbarOptions', { _wpnonce: nonce, id: options.id, });
	const [data, setData] = useState({});
	const [isEqual, setIsEqual] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	// First Fetch

	useEffect(() => {
		if (!isLoading && dbData) {
			setData(data => _.merge(data, dbData))
		}
	}, [dbData, isLoading]);

	useEffect(() => {

	}, [])

	const onSaveData = () => {
		if (!isLoading) {
			saveData({ [options.id]: JSON.stringify(data) });

			setTimeout(() => {
				setIsSaved(false);
			}, 2000);
		}
	}

	useEffect(() => {
		if (!isLoading) {
			if (_.isEqual(dbData, data)) {
				setIsEqual(false);
			} else if (!_.isEqual(dbData, data)) {
				setIsEqual(true);
			}
		}
	}, [isLoading, dbData, data])

	useEffect(() => {
		if (document.readyState === 'complete' || document.readyState === 'interactive') {
			refetch();
		}
	}, [document.readyState])


	const handleResetData = () => {
		if (options?.saveType === 'nested') {
			const newData = Object.keys(dbData)?.map((key) => dbData[key] = {});

			saveData({ [options.id]: JSON.stringify(newData) })
			refetch();
			location.reload()

		} else {
			for (const section of options.sections) {
				const fields = section?.fields;
				if (fields) {
					// db = extractDefaultsNested(fields);
					saveData({ [options.id]: JSON.stringify(extractDefaultsNested(fields)) })
					setData(extractDefaultsNested(fields));
					refetch()
					location.reload()
				}
			}
		}
	}

	window.onload = (e) => {
		let timeout
		if (e.isTrusted) {
			timeout = setTimeout(() => refetch(), 500)
		}
		return () => clearTimeout(timeout)
	}

	document.addEventListener("DOMContentLoaded", () => {
		refetch();
	})

	return <Main {...{ isEqual, setIsEqual, options, saveData, data, setData, onSaveData, isLoading, refetch, isSaved, setIsSaved, handleResetData, dbData }} {...props} />;
}
export default BPLSettings;