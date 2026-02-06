import { XMLParser } from "fast-xml-parser";
import externalApiClient from "../../../../api/ExternalApiClient";
import { AxiosInstance } from "axios";
import apiClient from "../../../../api/ApiClient";

export default abstract class BaseWidgetApi {
  protected formatEndpoint(endpoint: string, params: Record<string, string>): string {
    let url = endpoint;
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
    return url;
  }

  protected async getJson<T>(url: string, loadingKey?: string): Promise<T> {
    const response = await externalApiClient.get<T>(url, {
      meta: {
        loadingKey,
      },
    });
    return response.data;
  }

  protected async postExternalJson<T>(url: string, header: any, body: any, loadingKey?: string): Promise<T> {
    return await this.postJson<T>(externalApiClient, url, header, body, loadingKey);
  }

  protected async postInternalJson<T>(url: string, header: any, body: any, loadingKey?: string): Promise<T> {
    return await this.postJson<T>(apiClient, url, header, body, loadingKey);
  }

  protected async postJson<T>(
    client: AxiosInstance,
    url: string,
    header: any,
    body: any,
    loadingKey?: string,
  ): Promise<T> {
    header = {
      ...header,
      meta: {
        loadingKey,
      },
    };

    const response = await client.post<T>(url, body, header);
    return response.data;
  }

  protected async getXml<T>(url: string, loadingKey?: string): Promise<T> {
    const response = await externalApiClient.get<string>(url, {
      responseType: "text",
      meta: {
        loadingKey,
      },
    });
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      transformTagName: (tagName) => tagName.replace(/:/g, "_"), // safety if colons remain (media:content -> media_content)
      transformAttributeName: (attrName) => attrName.replace(/^@_/, ""),
    });
    return parser.parse(response.data) as T;
  }
}
