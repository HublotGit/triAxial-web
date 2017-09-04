/*********************************************************************
 *
 * $Id: yocto_network.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Network functions
 *
 * - - - - - - - - - License information: - - - - - - - - - 
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate this
 *  file into your software for the sole purpose of interfacing
 *  with Yoctopuce products.
 *
 *  You may reproduce and distribute copies of this file in
 *  source or object form, as long as the sole purpose of this
 *  code is to interface with Yoctopuce products. You must retain
 *  this notice in the distributed source file.
 *
 *  You should refer to Yoctopuce General Terms and Conditions
 *  for additional information regarding your rights and
 *  obligations.
 *
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
 *  WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING 
 *  WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
 *  FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *  EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *  INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
 *  COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
 *  SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
 *  LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *  CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *  BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *  WARRANTY, OR OTHERWISE.
 *
 *********************************************************************/

'use strict';
import { YAPI, YAPI_SUCCESS, YFunction, YModule, YSensor, YFunctionProxy, YSensorProxy } from 'yoctolib-es/src/yocto_api'

//--- (YNetwork return codes)
//--- (end of YNetwork return codes)
//--- (YNetwork definitions)
export var Y_READINESS_DOWN                = 0;
export var Y_READINESS_EXISTS              = 1;
export var Y_READINESS_LINKED              = 2;
export var Y_READINESS_LAN_OK              = 3;
export var Y_READINESS_WWW_OK              = 4;
export var Y_READINESS_INVALID             = -1;
export var Y_DISCOVERABLE_FALSE            = 0;
export var Y_DISCOVERABLE_TRUE             = 1;
export var Y_DISCOVERABLE_INVALID          = -1;
export var Y_CALLBACKMETHOD_POST           = 0;
export var Y_CALLBACKMETHOD_GET            = 1;
export var Y_CALLBACKMETHOD_PUT            = 2;
export var Y_CALLBACKMETHOD_INVALID        = -1;
export var Y_CALLBACKENCODING_FORM         = 0;
export var Y_CALLBACKENCODING_JSON         = 1;
export var Y_CALLBACKENCODING_JSON_ARRAY   = 2;
export var Y_CALLBACKENCODING_CSV          = 3;
export var Y_CALLBACKENCODING_YOCTO_API    = 4;
export var Y_CALLBACKENCODING_JSON_NUM     = 5;
export var Y_CALLBACKENCODING_EMONCMS      = 6;
export var Y_CALLBACKENCODING_AZURE        = 7;
export var Y_CALLBACKENCODING_INFLUXDB     = 8;
export var Y_CALLBACKENCODING_MQTT         = 9;
export var Y_CALLBACKENCODING_INVALID      = -1;
export var Y_MACADDRESS_INVALID            = YAPI.INVALID_STRING;
export var Y_IPADDRESS_INVALID             = YAPI.INVALID_STRING;
export var Y_SUBNETMASK_INVALID            = YAPI.INVALID_STRING;
export var Y_ROUTER_INVALID                = YAPI.INVALID_STRING;
export var Y_IPCONFIG_INVALID              = YAPI.INVALID_STRING;
export var Y_PRIMARYDNS_INVALID            = YAPI.INVALID_STRING;
export var Y_SECONDARYDNS_INVALID          = YAPI.INVALID_STRING;
export var Y_NTPSERVER_INVALID             = YAPI.INVALID_STRING;
export var Y_USERPASSWORD_INVALID          = YAPI.INVALID_STRING;
export var Y_ADMINPASSWORD_INVALID         = YAPI.INVALID_STRING;
export var Y_HTTPPORT_INVALID              = YAPI.INVALID_UINT;
export var Y_DEFAULTPAGE_INVALID           = YAPI.INVALID_STRING;
export var Y_WWWWATCHDOGDELAY_INVALID      = YAPI.INVALID_UINT;
export var Y_CALLBACKURL_INVALID           = YAPI.INVALID_STRING;
export var Y_CALLBACKCREDENTIALS_INVALID   = YAPI.INVALID_STRING;
export var Y_CALLBACKINITIALDELAY_INVALID  = YAPI.INVALID_UINT;
export var Y_CALLBACKMINDELAY_INVALID      = YAPI.INVALID_UINT;
export var Y_CALLBACKMAXDELAY_INVALID      = YAPI.INVALID_UINT;
export var Y_POECURRENT_INVALID            = YAPI.INVALID_UINT;
//--- (end of YNetwork definitions)

//--- (YNetwork class start)
/**
 * YNetwork Class: Network function interface
 *
 * YNetwork objects provide access to TCP/IP parameters of Yoctopuce
 * modules that include a built-in network interface.
 */
//--- (end of YNetwork class start)

export class YNetwork extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YNetwork constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Network';
        /** @member {number} **/
        this._readiness                  = Y_READINESS_INVALID;
        /** @member {string} **/
        this._macAddress                 = Y_MACADDRESS_INVALID;
        /** @member {string} **/
        this._ipAddress                  = Y_IPADDRESS_INVALID;
        /** @member {string} **/
        this._subnetMask                 = Y_SUBNETMASK_INVALID;
        /** @member {string} **/
        this._router                     = Y_ROUTER_INVALID;
        /** @member {string} **/
        this._ipConfig                   = Y_IPCONFIG_INVALID;
        /** @member {string} **/
        this._primaryDNS                 = Y_PRIMARYDNS_INVALID;
        /** @member {string} **/
        this._secondaryDNS               = Y_SECONDARYDNS_INVALID;
        /** @member {string} **/
        this._ntpServer                  = Y_NTPSERVER_INVALID;
        /** @member {string} **/
        this._userPassword               = Y_USERPASSWORD_INVALID;
        /** @member {string} **/
        this._adminPassword              = Y_ADMINPASSWORD_INVALID;
        /** @member {number} **/
        this._httpPort                   = Y_HTTPPORT_INVALID;
        /** @member {string} **/
        this._defaultPage                = Y_DEFAULTPAGE_INVALID;
        /** @member {number} **/
        this._discoverable               = Y_DISCOVERABLE_INVALID;
        /** @member {number} **/
        this._wwwWatchdogDelay           = Y_WWWWATCHDOGDELAY_INVALID;
        /** @member {string} **/
        this._callbackUrl                = Y_CALLBACKURL_INVALID;
        /** @member {number} **/
        this._callbackMethod             = Y_CALLBACKMETHOD_INVALID;
        /** @member {number} **/
        this._callbackEncoding           = Y_CALLBACKENCODING_INVALID;
        /** @member {string} **/
        this._callbackCredentials        = Y_CALLBACKCREDENTIALS_INVALID;
        /** @member {number} **/
        this._callbackInitialDelay       = Y_CALLBACKINITIALDELAY_INVALID;
        /** @member {number} **/
        this._callbackMinDelay           = Y_CALLBACKMINDELAY_INVALID;
        /** @member {number} **/
        this._callbackMaxDelay           = Y_CALLBACKMAXDELAY_INVALID;
        /** @member {number} **/
        this._poeCurrent                 = Y_POECURRENT_INVALID;
        this.imm_setConst({
            READINESS_DOWN               : 0,
            READINESS_EXISTS             : 1,
            READINESS_LINKED             : 2,
            READINESS_LAN_OK             : 3,
            READINESS_WWW_OK             : 4,
            READINESS_INVALID            : -1,
            MACADDRESS_INVALID           : YAPI.INVALID_STRING,
            IPADDRESS_INVALID            : YAPI.INVALID_STRING,
            SUBNETMASK_INVALID           : YAPI.INVALID_STRING,
            ROUTER_INVALID               : YAPI.INVALID_STRING,
            IPCONFIG_INVALID             : YAPI.INVALID_STRING,
            PRIMARYDNS_INVALID           : YAPI.INVALID_STRING,
            SECONDARYDNS_INVALID         : YAPI.INVALID_STRING,
            NTPSERVER_INVALID            : YAPI.INVALID_STRING,
            USERPASSWORD_INVALID         : YAPI.INVALID_STRING,
            ADMINPASSWORD_INVALID        : YAPI.INVALID_STRING,
            HTTPPORT_INVALID             : YAPI.INVALID_UINT,
            DEFAULTPAGE_INVALID          : YAPI.INVALID_STRING,
            DISCOVERABLE_FALSE           : 0,
            DISCOVERABLE_TRUE            : 1,
            DISCOVERABLE_INVALID         : -1,
            WWWWATCHDOGDELAY_INVALID     : YAPI.INVALID_UINT,
            CALLBACKURL_INVALID          : YAPI.INVALID_STRING,
            CALLBACKMETHOD_POST          : 0,
            CALLBACKMETHOD_GET           : 1,
            CALLBACKMETHOD_PUT           : 2,
            CALLBACKMETHOD_INVALID       : -1,
            CALLBACKENCODING_FORM        : 0,
            CALLBACKENCODING_JSON        : 1,
            CALLBACKENCODING_JSON_ARRAY  : 2,
            CALLBACKENCODING_CSV         : 3,
            CALLBACKENCODING_YOCTO_API   : 4,
            CALLBACKENCODING_JSON_NUM    : 5,
            CALLBACKENCODING_EMONCMS     : 6,
            CALLBACKENCODING_AZURE       : 7,
            CALLBACKENCODING_INFLUXDB    : 8,
            CALLBACKENCODING_MQTT        : 9,
            CALLBACKENCODING_INVALID     : -1,
            CALLBACKCREDENTIALS_INVALID  : YAPI.INVALID_STRING,
            CALLBACKINITIALDELAY_INVALID : YAPI.INVALID_UINT,
            CALLBACKMINDELAY_INVALID     : YAPI.INVALID_UINT,
            CALLBACKMAXDELAY_INVALID     : YAPI.INVALID_UINT,
            POECURRENT_INVALID           : YAPI.INVALID_UINT
        });
        //--- (end of YNetwork constructor)
    }

    //--- (YNetwork implementation)

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        var res = new YNetworkProxy(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'readiness':
            this._readiness = parseInt(val);
            return 1;
        case 'macAddress':
            this._macAddress = val;
            return 1;
        case 'ipAddress':
            this._ipAddress = val;
            return 1;
        case 'subnetMask':
            this._subnetMask = val;
            return 1;
        case 'router':
            this._router = val;
            return 1;
        case 'ipConfig':
            this._ipConfig = val;
            return 1;
        case 'primaryDNS':
            this._primaryDNS = val;
            return 1;
        case 'secondaryDNS':
            this._secondaryDNS = val;
            return 1;
        case 'ntpServer':
            this._ntpServer = val;
            return 1;
        case 'userPassword':
            this._userPassword = val;
            return 1;
        case 'adminPassword':
            this._adminPassword = val;
            return 1;
        case 'httpPort':
            this._httpPort = parseInt(val);
            return 1;
        case 'defaultPage':
            this._defaultPage = val;
            return 1;
        case 'discoverable':
            this._discoverable = parseInt(val);
            return 1;
        case 'wwwWatchdogDelay':
            this._wwwWatchdogDelay = parseInt(val);
            return 1;
        case 'callbackUrl':
            this._callbackUrl = val;
            return 1;
        case 'callbackMethod':
            this._callbackMethod = parseInt(val);
            return 1;
        case 'callbackEncoding':
            this._callbackEncoding = parseInt(val);
            return 1;
        case 'callbackCredentials':
            this._callbackCredentials = val;
            return 1;
        case 'callbackInitialDelay':
            this._callbackInitialDelay = parseInt(val);
            return 1;
        case 'callbackMinDelay':
            this._callbackMinDelay = parseInt(val);
            return 1;
        case 'callbackMaxDelay':
            this._callbackMaxDelay = parseInt(val);
            return 1;
        case 'poeCurrent':
            this._poeCurrent = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     *
     * @return {number} a value among YNetwork.READINESS_DOWN, YNetwork.READINESS_EXISTS,
     * YNetwork.READINESS_LINKED, YNetwork.READINESS_LAN_OK and YNetwork.READINESS_WWW_OK corresponding to
     * the current established working mode of the network interface
     *
     * On failure, throws an exception or returns YNetwork.READINESS_INVALID.
     */
    async get_readiness()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_READINESS_INVALID;
            }
        }
        return this._readiness;
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     *
     * @return {string} a string corresponding to the MAC address of the network interface
     *
     * On failure, throws an exception or returns YNetwork.MACADDRESS_INVALID.
     */
    async get_macAddress()
    {
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_MACADDRESS_INVALID;
            }
        }
        return this._macAddress;
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     *
     * @return {string} a string corresponding to the IP address currently in use by the device
     *
     * On failure, throws an exception or returns YNetwork.IPADDRESS_INVALID.
     */
    async get_ipAddress()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_IPADDRESS_INVALID;
            }
        }
        return this._ipAddress;
    }

    /**
     * Returns the subnet mask currently used by the device.
     *
     * @return {string} a string corresponding to the subnet mask currently used by the device
     *
     * On failure, throws an exception or returns YNetwork.SUBNETMASK_INVALID.
     */
    async get_subnetMask()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_SUBNETMASK_INVALID;
            }
        }
        return this._subnetMask;
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     *
     * @return {string} a string corresponding to the IP address of the router on the device subnet (default gateway)
     *
     * On failure, throws an exception or returns YNetwork.ROUTER_INVALID.
     */
    async get_router()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ROUTER_INVALID;
            }
        }
        return this._router;
    }

    async get_ipConfig()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_IPCONFIG_INVALID;
            }
        }
        return this._ipConfig;
    }

    async set_ipConfig(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('ipConfig',rest_val);
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     *
     * @return {string} a string corresponding to the IP address of the primary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.PRIMARYDNS_INVALID.
     */
    async get_primaryDNS()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_PRIMARYDNS_INVALID;
            }
        }
        return this._primaryDNS;
    }

    /**
     * Changes the IP address of the primary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval {string} : a string corresponding to the IP address of the primary name server to be
     * used by the module
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_primaryDNS(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('primaryDNS',rest_val);
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     *
     * @return {string} a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.SECONDARYDNS_INVALID.
     */
    async get_secondaryDNS()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_SECONDARYDNS_INVALID;
            }
        }
        return this._secondaryDNS;
    }

    /**
     * Changes the IP address of the secondary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval {string} : a string corresponding to the IP address of the secondary name server to
     * be used by the module
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_secondaryDNS(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('secondaryDNS',rest_val);
    }

    /**
     * Returns the IP address of the NTP server to be used by the device.
     *
     * @return {string} a string corresponding to the IP address of the NTP server to be used by the device
     *
     * On failure, throws an exception or returns YNetwork.NTPSERVER_INVALID.
     */
    async get_ntpServer()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_NTPSERVER_INVALID;
            }
        }
        return this._ntpServer;
    }

    /**
     * Changes the IP address of the NTP server to be used by the module.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval {string} : a string corresponding to the IP address of the NTP server to be used by the module
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_ntpServer(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('ntpServer',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @return {string} a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.USERPASSWORD_INVALID.
     */
    async get_userPassword()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_USERPASSWORD_INVALID;
            }
        }
        return this._userPassword;
    }

    /**
     * Changes the password for the "user" user. This password becomes instantly required
     * to perform any use of the module. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the password for the "user" user
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_userPassword(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('userPassword',rest_val);
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @return {string} a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.ADMINPASSWORD_INVALID.
     */
    async get_adminPassword()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ADMINPASSWORD_INVALID;
            }
        }
        return this._adminPassword;
    }

    /**
     * Changes the password for the "admin" user. This password becomes instantly required
     * to perform any change of the module state. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the password for the "admin" user
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_adminPassword(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('adminPassword',rest_val);
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return {number} an integer corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns YNetwork.HTTPPORT_INVALID.
     */
    async get_httpPort()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_HTTPPORT_INVALID;
            }
        }
        return this._httpPort;
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval {number} : an integer corresponding to the default HTML page returned by the hub
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_httpPort(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('httpPort',rest_val);
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return {string} a string corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns YNetwork.DEFAULTPAGE_INVALID.
     */
    async get_defaultPage()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_DEFAULTPAGE_INVALID;
            }
        }
        return this._defaultPage;
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval {string} : a string corresponding to the default HTML page returned by the hub
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_defaultPage(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('defaultPage',rest_val);
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @return {number} either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * On failure, throws an exception or returns YNetwork.DISCOVERABLE_INVALID.
     */
    async get_discoverable()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_DISCOVERABLE_INVALID;
            }
        }
        return this._discoverable;
    }

    /**
     * Changes the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @param newval {number} : either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE,
     * according to the activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_discoverable(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('discoverable',rest_val);
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     *
     * @return {number} an integer corresponding to the allowed downtime of the WWW link (in seconds)
     * before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * On failure, throws an exception or returns YNetwork.WWWWATCHDOGDELAY_INVALID.
     */
    async get_wwwWatchdogDelay()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_WWWWATCHDOGDELAY_INVALID;
            }
        }
        return this._wwwWatchdogDelay;
    }

    /**
     * Changes the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss. The smallest valid non-zero timeout is
     * 90 seconds.
     *
     * @param newval {number} : an integer corresponding to the allowed downtime of the WWW link (in
     * seconds) before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_wwwWatchdogDelay(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('wwwWatchdogDelay',rest_val);
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     *
     * @return {string} a string corresponding to the callback URL to notify of significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKURL_INVALID.
     */
    async get_callbackUrl()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALLBACKURL_INVALID;
            }
        }
        return this._callbackUrl;
    }

    /**
     * Changes the callback URL to notify significant state changes. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {string} : a string corresponding to the callback URL to notify significant state changes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackUrl(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('callbackUrl',rest_val);
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     *
     * @return {number} a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMETHOD_INVALID.
     */
    async get_callbackMethod()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALLBACKMETHOD_INVALID;
            }
        }
        return this._callbackMethod;
    }

    /**
     * Changes the HTTP method used to notify callbacks for significant state changes.
     *
     * @param newval {number} : a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET
     * and YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMethod(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackMethod',rest_val);
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     *
     * @return {number} a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV,
     * YNetwork.CALLBACKENCODING_YOCTO_API, YNetwork.CALLBACKENCODING_JSON_NUM,
     * YNetwork.CALLBACKENCODING_EMONCMS, YNetwork.CALLBACKENCODING_AZURE,
     * YNetwork.CALLBACKENCODING_INFLUXDB and YNetwork.CALLBACKENCODING_MQTT corresponding to the encoding
     * standard to use for representing notification values
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKENCODING_INVALID.
     */
    async get_callbackEncoding()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALLBACKENCODING_INVALID;
            }
        }
        return this._callbackEncoding;
    }

    /**
     * Changes the encoding standard to use for representing notification values.
     *
     * @param newval {number} : a value among YNetwork.CALLBACKENCODING_FORM,
     * YNetwork.CALLBACKENCODING_JSON, YNetwork.CALLBACKENCODING_JSON_ARRAY,
     * YNetwork.CALLBACKENCODING_CSV, YNetwork.CALLBACKENCODING_YOCTO_API,
     * YNetwork.CALLBACKENCODING_JSON_NUM, YNetwork.CALLBACKENCODING_EMONCMS,
     * YNetwork.CALLBACKENCODING_AZURE, YNetwork.CALLBACKENCODING_INFLUXDB and
     * YNetwork.CALLBACKENCODING_MQTT corresponding to the encoding standard to use for representing
     * notification values
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackEncoding(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackEncoding',rest_val);
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @return {string} a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKCREDENTIALS_INVALID.
     */
    async get_callbackCredentials()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALLBACKCREDENTIALS_INVALID;
            }
        }
        return this._callbackCredentials;
    }

    /**
     * Changes the credentials required to connect to the callback address. The credentials
     * must be provided as returned by function get_callbackCredentials,
     * in the form username:hash. The method used to compute the hash varies according
     * to the the authentication scheme implemented by the callback, For Basic authentication,
     * the hash is the MD5 of the string username:password. For Digest authentication,
     * the hash is the MD5 of the string username:realm:password. For a simpler
     * way to configure callback credentials, use function callbackLogin instead.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the credentials required to connect to the callback address
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackCredentials(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Connects to the notification callback and saves the credentials required to
     * log into it. The password is not stored into the module, only a hashed
     * copy of the credentials are saved. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param username {string} : username required to log to the callback
     * @param password {string} : password required to log to the callback
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async callbackLogin(username,password)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = username+':'+password;
        return await this._setAttr('callbackCredentials',rest_val);
    }

    /**
     * Returns the initial waiting time before first callback notifications, in seconds.
     *
     * @return {number} an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKINITIALDELAY_INVALID.
     */
    async get_callbackInitialDelay()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALLBACKINITIALDELAY_INVALID;
            }
        }
        return this._callbackInitialDelay;
    }

    /**
     * Changes the initial waiting time before first callback notifications, in seconds.
     *
     * @param newval {number} : an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackInitialDelay(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackInitialDelay',rest_val);
    }

    /**
     * Returns the minimum waiting time between two callback notifications, in seconds.
     *
     * @return {number} an integer corresponding to the minimum waiting time between two callback
     * notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMINDELAY_INVALID.
     */
    async get_callbackMinDelay()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALLBACKMINDELAY_INVALID;
            }
        }
        return this._callbackMinDelay;
    }

    /**
     * Changes the minimum waiting time between two callback notifications, in seconds.
     *
     * @param newval {number} : an integer corresponding to the minimum waiting time between two callback
     * notifications, in seconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMinDelay(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackMinDelay',rest_val);
    }

    /**
     * Returns the maximum waiting time between two callback notifications, in seconds.
     *
     * @return {number} an integer corresponding to the maximum waiting time between two callback
     * notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMAXDELAY_INVALID.
     */
    async get_callbackMaxDelay()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALLBACKMAXDELAY_INVALID;
            }
        }
        return this._callbackMaxDelay;
    }

    /**
     * Changes the maximum waiting time between two callback notifications, in seconds.
     *
     * @param newval {number} : an integer corresponding to the maximum waiting time between two callback
     * notifications, in seconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_callbackMaxDelay(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('callbackMaxDelay',rest_val);
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milli-amps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @return {number} an integer corresponding to the current consumed by the module from
     * Power-over-Ethernet (PoE), in milli-amps
     *
     * On failure, throws an exception or returns YNetwork.POECURRENT_INVALID.
     */
    async get_poeCurrent()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_POECURRENT_INVALID;
            }
        }
        return this._poeCurrent;
    }

    /**
     * Retrieves a network interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the network interface
     *
     * @return {YNetwork} a YNetwork object allowing you to drive the network interface.
     */
    static FindNetwork(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Network', func);
        if (obj == null) {
            obj = new YNetwork(YAPI, func);
            YFunction._AddToCache('Network',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a network interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the network interface
     *
     * @return {YNetwork} a YNetwork object allowing you to drive the network interface.
     */
    static FindNetworkInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Network', func);
        if (obj == null) {
            obj = new YNetwork(yctx, func);
            YFunction._AddToCache('Network',  func, obj);
        }
        return obj;
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses the IP parameters specified to this function.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param fallbackIpAddr {string} : fallback IP address, to be used when no DHCP reply is received
     * @param fallbackSubnetMaskLen {number} : fallback subnet mask length when no DHCP reply is received, as an
     *         integer (eg. 24 means 255.255.255.0)
     * @param fallbackRouter {string} : fallback router IP address, to be used when no DHCP reply is received
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useDHCP(fallbackIpAddr,fallbackSubnetMaskLen,fallbackRouter)
    {
        return await this.set_ipConfig('DHCP:'+fallbackIpAddr+'/'+String(Math.round(fallbackSubnetMaskLen))+'/'+fallbackRouter);
    }

    /**
     * Changes the configuration of the network interface to use a static IP address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ipAddress {string} : device IP address
     * @param subnetMaskLen {number} : subnet mask length, as an integer (eg. 24 means 255.255.255.0)
     * @param router {string} : router IP address (default gateway)
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async useStaticIP(ipAddress,subnetMaskLen,router)
    {
        return await this.set_ipConfig('STATIC:'+ipAddress+'/'+String(Math.round(subnetMaskLen))+'/'+router);
    }

    /**
     * Pings host to test the network connectivity. Sends four ICMP ECHO_REQUEST requests from the
     * module to the target host. This method returns a string with the result of the
     * 4 ICMP ECHO_REQUEST requests.
     *
     * @param host {string} : the hostname or the IP address of the target
     *
     * @return {string} a string with the result of the ping.
     */
    async ping(host)
    {
        /** @type {Uint8Array} **/
        let content;
        // may throw an exception
        content = await this._download('ping.txt?host='+host);
        return this._yapi.imm_bin2str(content);
    }

    /**
     * Trigger an HTTP callback quickly. This function can even be called within
     * an HTTP callback, in which case the next callback will be triggered 5 seconds
     * after the end of the current callback, regardless if the minimum time between
     * callbacks configured in the device.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async triggerCallback()
    {
        return await this.set_callbackMethod(await this.get_callbackMethod());
    }

    /**
     * Continues the enumeration of network interfaces started using yFirstNetwork().
     *
     * @return {YNetwork} a pointer to a YNetwork object, corresponding to
     *         a network interface currently online, or a null pointer
     *         if there are no more network interfaces to enumerate.
     */
    nextNetwork()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YNetwork.FindNetworkInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     *
     * @return {YNetwork} a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstNetwork()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Network');
        if(next_hwid == null) return null;
        return YNetwork.FindNetwork(next_hwid);
    }

    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YNetwork} a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstNetworkInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Network');
        if(next_hwid == null) return null;
        return YNetwork.FindNetworkInContext(yctx, next_hwid);
    }

    //--- (end of YNetwork implementation)
}

//
// YNetworkProxy Class: synchronous proxy to YNetwork objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YNetwork objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
export class YNetworkProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YNetwork accessors declaration)

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     *
     * @return a value among Y_READINESS_DOWN, Y_READINESS_EXISTS, Y_READINESS_LINKED, Y_READINESS_LAN_OK
     * and Y_READINESS_WWW_OK corresponding to the current established working mode of the network interface
     *
     * On failure, throws an exception or returns Y_READINESS_INVALID.
     */
    get_readiness()
    {
        return this.liveFunc._readiness;
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     *
     * @return a string corresponding to the MAC address of the network interface
     *
     * On failure, throws an exception or returns Y_MACADDRESS_INVALID.
     */
    get_macAddress()
    {
        return this.liveFunc._macAddress;
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     *
     * @return a string corresponding to the IP address currently in use by the device
     *
     * On failure, throws an exception or returns Y_IPADDRESS_INVALID.
     */
    get_ipAddress()
    {
        return this.liveFunc._ipAddress;
    }

    /**
     * Returns the subnet mask currently used by the device.
     *
     * @return a string corresponding to the subnet mask currently used by the device
     *
     * On failure, throws an exception or returns Y_SUBNETMASK_INVALID.
     */
    get_subnetMask()
    {
        return this.liveFunc._subnetMask;
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     *
     * @return a string corresponding to the IP address of the router on the device subnet (default gateway)
     *
     * On failure, throws an exception or returns Y_ROUTER_INVALID.
     */
    get_router()
    {
        return this.liveFunc._router;
    }

    get_ipConfig()
    {
        return this.liveFunc._ipConfig;
    }

    set_ipConfig(newval)
    {
        this.liveFunc.set_ipConfig(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the primary name server to be used by the module
     *
     * On failure, throws an exception or returns Y_PRIMARYDNS_INVALID.
     */
    get_primaryDNS()
    {
        return this.liveFunc._primaryDNS;
    }

    /**
     * Changes the IP address of the primary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the primary name server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_primaryDNS(newval)
    {
        this.liveFunc.set_primaryDNS(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * On failure, throws an exception or returns Y_SECONDARYDNS_INVALID.
     */
    get_secondaryDNS()
    {
        return this.liveFunc._secondaryDNS;
    }

    /**
     * Changes the IP address of the secondary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_secondaryDNS(newval)
    {
        this.liveFunc.set_secondaryDNS(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the IP address of the NTP server to be used by the device.
     *
     * @return a string corresponding to the IP address of the NTP server to be used by the device
     *
     * On failure, throws an exception or returns Y_NTPSERVER_INVALID.
     */
    get_ntpServer()
    {
        return this.liveFunc._ntpServer;
    }

    /**
     * Changes the IP address of the NTP server to be used by the module.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the NTP server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ntpServer(newval)
    {
        this.liveFunc.set_ntpServer(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_USERPASSWORD_INVALID.
     */
    get_userPassword()
    {
        return this.liveFunc._userPassword;
    }

    /**
     * Changes the password for the "user" user. This password becomes instantly required
     * to perform any use of the module. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "user" user
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_userPassword(newval)
    {
        this.liveFunc.set_userPassword(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_ADMINPASSWORD_INVALID.
     */
    get_adminPassword()
    {
        return this.liveFunc._adminPassword;
    }

    /**
     * Changes the password for the "admin" user. This password becomes instantly required
     * to perform any change of the module state. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "admin" user
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_adminPassword(newval)
    {
        this.liveFunc.set_adminPassword(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return an integer corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns Y_HTTPPORT_INVALID.
     */
    get_httpPort()
    {
        return this.liveFunc._httpPort;
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval : an integer corresponding to the default HTML page returned by the hub
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_httpPort(newval)
    {
        this.liveFunc.set_httpPort(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return a string corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns Y_DEFAULTPAGE_INVALID.
     */
    get_defaultPage()
    {
        return this.liveFunc._defaultPage;
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval : a string corresponding to the default HTML page returned by the hub
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_defaultPage(newval)
    {
        this.liveFunc.set_defaultPage(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @return either Y_DISCOVERABLE_FALSE or Y_DISCOVERABLE_TRUE, according to the activation state of
     * the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * On failure, throws an exception or returns Y_DISCOVERABLE_INVALID.
     */
    get_discoverable()
    {
        return this.liveFunc._discoverable;
    }

    /**
     * Changes the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @param newval : either Y_DISCOVERABLE_FALSE or Y_DISCOVERABLE_TRUE, according to the activation
     * state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_discoverable(newval)
    {
        this.liveFunc.set_discoverable(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     *
     * @return an integer corresponding to the allowed downtime of the WWW link (in seconds) before
     * triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * On failure, throws an exception or returns Y_WWWWATCHDOGDELAY_INVALID.
     */
    get_wwwWatchdogDelay()
    {
        return this.liveFunc._wwwWatchdogDelay;
    }

    /**
     * Changes the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss. The smallest valid non-zero timeout is
     * 90 seconds.
     *
     * @param newval : an integer corresponding to the allowed downtime of the WWW link (in seconds)
     * before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_wwwWatchdogDelay(newval)
    {
        this.liveFunc.set_wwwWatchdogDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     *
     * @return a string corresponding to the callback URL to notify of significant state changes
     *
     * On failure, throws an exception or returns Y_CALLBACKURL_INVALID.
     */
    get_callbackUrl()
    {
        return this.liveFunc._callbackUrl;
    }

    /**
     * Changes the callback URL to notify significant state changes. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the callback URL to notify significant state changes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackUrl(newval)
    {
        this.liveFunc.set_callbackUrl(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     *
     * @return a value among Y_CALLBACKMETHOD_POST, Y_CALLBACKMETHOD_GET and Y_CALLBACKMETHOD_PUT
     * corresponding to the HTTP method used to notify callbacks for significant state changes
     *
     * On failure, throws an exception or returns Y_CALLBACKMETHOD_INVALID.
     */
    get_callbackMethod()
    {
        return this.liveFunc._callbackMethod;
    }

    /**
     * Changes the HTTP method used to notify callbacks for significant state changes.
     *
     * @param newval : a value among Y_CALLBACKMETHOD_POST, Y_CALLBACKMETHOD_GET and Y_CALLBACKMETHOD_PUT
     * corresponding to the HTTP method used to notify callbacks for significant state changes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMethod(newval)
    {
        this.liveFunc.set_callbackMethod(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     *
     * @return a value among Y_CALLBACKENCODING_FORM, Y_CALLBACKENCODING_JSON,
     * Y_CALLBACKENCODING_JSON_ARRAY, Y_CALLBACKENCODING_CSV, Y_CALLBACKENCODING_YOCTO_API,
     * Y_CALLBACKENCODING_JSON_NUM, Y_CALLBACKENCODING_EMONCMS, Y_CALLBACKENCODING_AZURE,
     * Y_CALLBACKENCODING_INFLUXDB and Y_CALLBACKENCODING_MQTT corresponding to the encoding standard to
     * use for representing notification values
     *
     * On failure, throws an exception or returns Y_CALLBACKENCODING_INVALID.
     */
    get_callbackEncoding()
    {
        return this.liveFunc._callbackEncoding;
    }

    /**
     * Changes the encoding standard to use for representing notification values.
     *
     * @param newval : a value among Y_CALLBACKENCODING_FORM, Y_CALLBACKENCODING_JSON,
     * Y_CALLBACKENCODING_JSON_ARRAY, Y_CALLBACKENCODING_CSV, Y_CALLBACKENCODING_YOCTO_API,
     * Y_CALLBACKENCODING_JSON_NUM, Y_CALLBACKENCODING_EMONCMS, Y_CALLBACKENCODING_AZURE,
     * Y_CALLBACKENCODING_INFLUXDB and Y_CALLBACKENCODING_MQTT corresponding to the encoding standard to
     * use for representing notification values
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackEncoding(newval)
    {
        this.liveFunc.set_callbackEncoding(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_CALLBACKCREDENTIALS_INVALID.
     */
    get_callbackCredentials()
    {
        return this.liveFunc._callbackCredentials;
    }

    /**
     * Changes the credentials required to connect to the callback address. The credentials
     * must be provided as returned by function get_callbackCredentials,
     * in the form username:hash. The method used to compute the hash varies according
     * to the the authentication scheme implemented by the callback, For Basic authentication,
     * the hash is the MD5 of the string username:password. For Digest authentication,
     * the hash is the MD5 of the string username:realm:password. For a simpler
     * way to configure callback credentials, use function callbackLogin instead.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the credentials required to connect to the callback address
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackCredentials(newval)
    {
        this.liveFunc.set_callbackCredentials(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the initial waiting time before first callback notifications, in seconds.
     *
     * @return an integer corresponding to the initial waiting time before first callback notifications, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKINITIALDELAY_INVALID.
     */
    get_callbackInitialDelay()
    {
        return this.liveFunc._callbackInitialDelay;
    }

    /**
     * Changes the initial waiting time before first callback notifications, in seconds.
     *
     * @param newval : an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackInitialDelay(newval)
    {
        this.liveFunc.set_callbackInitialDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the minimum waiting time between two callback notifications, in seconds.
     *
     * @return an integer corresponding to the minimum waiting time between two callback notifications, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKMINDELAY_INVALID.
     */
    get_callbackMinDelay()
    {
        return this.liveFunc._callbackMinDelay;
    }

    /**
     * Changes the minimum waiting time between two callback notifications, in seconds.
     *
     * @param newval : an integer corresponding to the minimum waiting time between two callback
     * notifications, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMinDelay(newval)
    {
        this.liveFunc.set_callbackMinDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximum waiting time between two callback notifications, in seconds.
     *
     * @return an integer corresponding to the maximum waiting time between two callback notifications, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKMAXDELAY_INVALID.
     */
    get_callbackMaxDelay()
    {
        return this.liveFunc._callbackMaxDelay;
    }

    /**
     * Changes the maximum waiting time between two callback notifications, in seconds.
     *
     * @param newval : an integer corresponding to the maximum waiting time between two callback
     * notifications, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMaxDelay(newval)
    {
        this.liveFunc.set_callbackMaxDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milli-amps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @return an integer corresponding to the current consumed by the module from Power-over-Ethernet
     * (PoE), in milli-amps
     *
     * On failure, throws an exception or returns Y_POECURRENT_INVALID.
     */
    get_poeCurrent()
    {
        return this.liveFunc._poeCurrent;
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses the IP parameters specified to this function.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param fallbackIpAddr : fallback IP address, to be used when no DHCP reply is received
     * @param fallbackSubnetMaskLen : fallback subnet mask length when no DHCP reply is received, as an
     *         integer (eg. 24 means 255.255.255.0)
     * @param fallbackRouter : fallback router IP address, to be used when no DHCP reply is received
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    useDHCP(fallbackIpAddr,fallbackSubnetMaskLen,fallbackRouter)
    {
        this.liveFunc.useDHCP(fallbackIpAddr, fallbackSubnetMaskLen, fallbackRouter);
        return YAPI_SUCCESS;
    }

    /**
     * Changes the configuration of the network interface to use a static IP address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ipAddress : device IP address
     * @param subnetMaskLen : subnet mask length, as an integer (eg. 24 means 255.255.255.0)
     * @param router : router IP address (default gateway)
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    useStaticIP(ipAddress,subnetMaskLen,router)
    {
        this.liveFunc.useStaticIP(ipAddress, subnetMaskLen, router);
        return YAPI_SUCCESS;
    }

    /**
     * Trigger an HTTP callback quickly. This function can even be called within
     * an HTTP callback, in which case the next callback will be triggered 5 seconds
     * after the end of the current callback, regardless if the minimum time between
     * callbacks configured in the device.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerCallback()
    {
        this.liveFunc.triggerCallback();
        return YAPI_SUCCESS;
    }
    //--- (end of YNetwork accessors declaration)
}

//--- (Network functions)

/**
 * Retrieves a network interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the network interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YNetwork.isOnline() to test if the network interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a network interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the network interface
 *
 * @return {YNetwork} a YNetwork object allowing you to drive the network interface.
 */
export function yFindNetwork(func)
{
    return YNetwork.FindNetwork(func);
}

/**
 * Starts the enumeration of network interfaces currently accessible.
 * Use the method YNetwork.nextNetwork() to iterate on
 * next network interfaces.
 *
 * @return {YNetwork} a pointer to a YNetwork object, corresponding to
 *         the first network interface currently online, or a null pointer
 *         if there are none.
 */
export function yFirstNetwork()
{
    return YNetwork.FirstNetwork();
}

//--- (end of Network functions)