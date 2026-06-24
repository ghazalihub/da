import 'package:flutter/material.dart';
import 'package:dating_app/helpers/app_localizations.dart';

class WebAdDialog extends StatefulWidget {
  const WebAdDialog({super.key});

  @override
  WebAdDialogState createState() => WebAdDialogState();
}

class WebAdDialogState extends State<WebAdDialog> {
  int _secondsRemaining = 5;
  bool _canClose = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          if (_secondsRemaining > 1) {
            _secondsRemaining--;
            _startTimer();
          } else {
            _canClose = true;
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final i18n = AppLocalizations.of(context);

    return Dialog.fullscreen(
      backgroundColor: Colors.black.withAlpha(200),
      child: Stack(
        children: [
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 300,
                  height: 250,
                  color: Colors.white,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.ad_units, size: 50, color: Colors.blue),
                        const SizedBox(height: 16),
                        Text(
                          i18n.translate('advertisement') ?? 'Advertisement',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                        ),
                        const SizedBox(height: 8),
                        const Text('Your ad content here'),
                        const SizedBox(height: 16),
                        // You could add a button to visit a sponsor URL
                        ElevatedButton(
                          onPressed: () {},
                          child: const Text('Visit Sponsor'),
                        )
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            top: 40,
            right: 20,
            child: _canClose
                ? IconButton(
                    icon: const Icon(Icons.close, color: Colors.white, size: 30),
                    onPressed: () => Navigator.of(context).pop(),
                  )
                : Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.black.withAlpha(150),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '$_secondsRemaining',
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
