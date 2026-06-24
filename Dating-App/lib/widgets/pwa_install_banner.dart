import 'package:flutter/material.dart';
import 'package:dating_app/helpers/app_localizations.dart';
import 'dart:js' as js;

class PwaInstallBanner extends StatelessWidget {
  const PwaInstallBanner({super.key});

  @override
  Widget build(BuildContext context) {
    final i18n = AppLocalizations.of(context);

    return Container(
      padding: const EdgeInsets.all(16),
      color: Theme.of(context).primaryColor.withAlpha(20),
      child: Row(
        children: [
          Icon(Icons.install_mobile, color: Theme.of(context).primaryColor),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  i18n.translate('install_app_for_better_experience'),
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(i18n.translate('add_to_home_screen_to_use_it_like_a_native_app')),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () {
              js.context.callMethod('installPwa');
            },
            child: Text(i18n.translate('INSTALL')),
          ),
        ],
      ),
    );
  }
}
