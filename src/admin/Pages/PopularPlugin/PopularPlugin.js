/* eslint-disable no-console */
/* eslint-disable no-undef */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from "react";
import { loadingIcon } from '../../utils/icons';

import './style.scss';
import { Button } from '../../../../../bpl-tools/Components';
const PopularPlugin = ({ ajaxUrl, nonce }) => {

    const [installedPlugins, setInstalledPlugins] = useState([]);
    const [pluginslug, setPluginslug] = useState(null);
    const [popularPlugins, setPopularPlugins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchPopularPlugins = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${ajaxUrl}?action=csb_adv_scrollbar_get_popular_plugins&nonce=${nonce}`);
                const response = await res.json();

                const allowedPlugins = ['html5-audio-player', 'html5-video-player', 'pdf-poster', '3d-viewer', 'advanced-post-block', 'advance-custom-html'];
                const filteredPlugins = response?.data?.filter(plugin => allowedPlugins?.includes(plugin?.slug));
                setPopularPlugins(filteredPlugins);
                setLoading(false);

            } catch (error) {
                setLoading(false);
            }
        }
        fetchPopularPlugins();

    }, []);

    useEffect(() => {

        const fetchActivePlugins = async () => {
            try {
                const res = await fetch(
                    `${ajaxUrl}?action=adv_scrollbar_get_active_plugins&nonce=${nonce}`
                );
                const response = await res.json();
                if (response.success) {
                    setInstalledPlugins(response.data); // Set the list of installed plugins
                } else {
                    console.error("Error fetching installed plugins:", response.message);
                }
            } catch (error) {
                console.error("Error fetching installed plugins:", error);
            }
        };
        fetchActivePlugins();


    }, []);

    const actionHooks = async (pluginName) => {
        setPluginslug(pluginName); // Set the loading state to the plugin name

        try {
            const res = await fetch(`${ajaxUrl}?action=adv_scrollbar_activated_plugin&plugin_name=${pluginName}&nonce=${nonce}`);
            const responseText = await res.text();

            const jsonStart = responseText.indexOf("{");
            if (jsonStart !== -1) {
                const jsonString = responseText.slice(jsonStart);
                const response = JSON.parse(jsonString);
                window.location.href = response.data.redirectUrl;
            } else {
                console.error("No JSON found in the response.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setPluginslug(null); // Reset the loading state
        }
    };

    return (
        <div className='bPbPopularPluginWrapper'>
            <div className="bPlheaderArea">
                <h2>{__('Most Popular Plugin')}</h2>
                <a className="action-button" href="https://profiles.wordpress.org/abuhayat/#content-plugins" target="_blank" rel="noopener noreferrer"> {__('Our All Plugins', 'slider')} </a>
            </div>

            <div className="bPlfeature-section">
                <div className="bPlfeature-container">
                    <div className="bPlpopular-section">
                        {!loading ? <div className="bPlpluginArea">
                            {popularPlugins?.map((singlePlugin, index) => {
                                const isInstalled = installedPlugins.some(
                                    (pluginSlug) => {
                                        if (singlePlugin?.slug === "advanced-post-block") {
                                            return pluginSlug === "advanced-post-block/plugin.php";
                                        }
                                        return pluginSlug === `${singlePlugin?.slug}/${singlePlugin?.slug}.php`;
                                    }
                                );
                                return (
                                    <div className="bPlitem" key={index}>
                                        <div className="bPlimg"><img src={singlePlugin?.icons["1x"]} alt={singlePlugin?.slug} /></div>
                                        <div className="bPltitle"><h3 dangerouslySetInnerHTML={{ __html: singlePlugin?.name }}></h3></div>
                                        <div className="bPldesc"><p>{singlePlugin?.short_description}</p></div>
                                        <div className="bPlbtn_area">
                                            <Button className={`outline ${isInstalled ? 'bPlinstalledSuccess' : 'bPlaction-button'}  ${pluginslug === singlePlugin?.slug ? "installing..." : ""}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!isInstalled)
                                                        actionHooks(singlePlugin?.slug);
                                                }}
                                                disabled={isInstalled || pluginslug === singlePlugin?.slug}
                                                size='medium'
                                            >
                                                {pluginslug === singlePlugin?.slug
                                                    ? "Installing..."
                                                    : isInstalled
                                                        ? "Installed"
                                                        : "Install"}
                                            </Button>
                                            <Button className="outline" href={singlePlugin?.download_link} target='_blank' rel='noopener noreferrer' size='medium'>Download</Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                            : <div className="bPlloading">
                                {loadingIcon}
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PopularPlugin;
