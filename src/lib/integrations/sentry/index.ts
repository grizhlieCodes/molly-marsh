const IGNORED_URL_PATH_FRAGMENTS = ['/themes/index.php', '/wp-back.php', '/wp-includes/wp-includes_function.php', '/.well-known/file.php', '/install.php', '/images/class-config.php', '/comfunctions.php', '/.well-known/classtostring.php', '/cgi-bin/about.php', '/wp-admin/install.php', '/wp-includes/wp-class.php', '/wp-admin/js', '/wp-includes/about.php', '/0x.php', '/adminfuns.php', '/sx.php', '/assets/bypass.php', '/wp-cron.php', '/wp-includes/plugins.php', '/defaults.php', '/wp-admin/users.php', '/ova.php', '/link.php', '/wp-admin', '/wp-admin/index.php', '/webadmin.php', '/wp-trackback.php', '/wp-mail.php', '/wso.php', '/wp-config-sample.php', '/ws.php', '/randkeyword.Php7', '/files.php', '/test.php', '/cgi-bin/wp-login.php', '/.well-known', '/content.php', '/wp-admin/autoload_classmap.php', '/themes.php', '/xmlrpc.php', '/files/index.php', '/wp-admin/classtostring.php', '/.well-known/caches.php', '/g.php'];

/**
 * Sentry beforeSend filter to ignore events from a list of URLs.
 * This is used to filter out noise from bots scanning for vulnerabilities.
 * @param event The Sentry event.
 * @returns The event if it should be sent, or null if it should be dropped.
 */
export function beforeSend(event: any) {
	if (event.request && event.request.url) {
		const eventUrl = event.request.url;
		if (IGNORED_URL_PATH_FRAGMENTS.some((fragment) => eventUrl.includes(fragment))) {
			return null;
		}
	}
	return event;
}
