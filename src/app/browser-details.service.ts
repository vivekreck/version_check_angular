import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserDetailsService {
  allowedOS = {
    Windows: 11,
    macOS: 13,
    Android: 13,
    iOS: 17,
  };

  allowedBrowsers = {
    Chrome: 130,
    Firefox: 130,
    Edge: 130,
    Opera: 114,
    Safari: 17,
  };

  async getBrowserDetails(): Promise<any> {
    const details: any = {
      os: 'Unknown',
      osVersion: 'Unknown',
      browser: 'Unknown',
      browserVersion: 'Unknown',
    };

    const uaData = navigator.userAgentData || {};
    const userAgent = navigator.userAgent;

    if (uaData.getHighEntropyValues) {
      try {
        const highEntropyValues = await uaData.getHighEntropyValues([
          'platform',
          'platformVersion',
          'architecture',
          'uaFullVersion',
        ]);
        details.os = highEntropyValues['platform'] || 'Unknown';
        details.osVersion = highEntropyValues['platformVersion'] || 'Unknown';
        details.browserVersion =
          highEntropyValues['uaFullVersion'] || 'Unknown';
      } catch (error) {
        console.error('Error fetching high-entropy values:', error);
      }
    }

    if (/Windows NT (\d+\.\d+)/.test(userAgent)) {
      details.os = 'Windows';
      const version = parseFloat(userAgent.match(/Windows NT (\d+\.\d+)/)![1]);
      details.osVersion = version >= 10.0 ? 11 : version;
    } else if (/Mac OS X (\d+_\d+)/.test(userAgent)) {
      details.os = 'macOS';
      details.osVersion = parseFloat(
        userAgent.match(/Mac OS X (\d+_\d+)/)![1].replace('_', '.')
      );
    } else if (/Android (\d+)/.test(userAgent)) {
      details.os = 'Android';
      details.osVersion = parseInt(userAgent.match(/Android (\d+)/)![1]);
    } else if (
      /iPhone|iPad|iPod/.test(userAgent) &&
      /OS (\d+_\d+)/.test(userAgent)
    ) {
      details.os = 'iOS';
      details.osVersion = parseFloat(
        userAgent.match(/OS (\d+_\d+)/)![1].replace('_', '.')
      );
    }

    if (/Chrome\/(\d+)/.test(userAgent) && !/Edge|Edg/.test(userAgent)) {
      details.browser = 'Chrome';
      details.browserVersion = parseInt(userAgent.match(/Chrome\/(\d+)/)![1]);
    } else if (/Firefox\/(\d+)/.test(userAgent)) {
      details.browser = 'Firefox';
      details.browserVersion = parseInt(userAgent.match(/Firefox\/(\d+)/)![1]);
    } else if (/Edg\/(\d+)/.test(userAgent)) {
      details.browser = 'Edge';
      details.browserVersion = parseInt(userAgent.match(/Edg\/(\d+)/)![1]);
    } else if (/OPR\/(\d+)/.test(userAgent)) {
      details.browser = 'Opera';
      details.browserVersion = parseInt(userAgent.match(/OPR\/(\d+)/)![1]);
    } else if (/Version\/(\d+).*Safari/.test(userAgent)) {
      details.browser = 'Safari';
      details.browserVersion = parseInt(userAgent.match(/Version\/(\d+)/)![1]);
    }

    return details;
  }

  validateDetails(details: any): string {
    let message = '';

    if (this.allowedOS[details.os as keyof typeof this.allowedOS]) {
      if (details.osVersion < this.allowedOS[details.os as keyof typeof this.allowedOS]) {
        message += `Your operating system (${details.os} ${details.osVersion}) is outdated.<br>`;
      }
    }
    
    if (this.allowedBrowsers[details.browser as keyof typeof this.allowedBrowsers]) {
      if (details.browserVersion < this.allowedBrowsers[details.browser as keyof typeof this.allowedBrowsers]) {
        message += `Your browser (${details.browser} ${details.browserVersion}) is outdated.<br>`;
      }
    }
    

    return message || 'Your browser and OS are supported.';
  }
}
