package com.example.demo;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@Slf4j
@SpringBootApplication
public class DemoApplication {
    private static final OkHttpClient client = new OkHttpClient();

    private static final Set<String> TARGET_KEYWORDS = Set.of(
        "champions",
        "items",
        "runes",
        "systems",
        "bugfixes",
        "skins"
    );

    public static Map<String, String> crawlingTest(String version) {
        Map<String, String> result = new LinkedHashMap<>();
        String htmlResponse = "";
        try {
            String fullUrl = "https://www.leagueoflegends.com/ko-kr/news/game-updates/league-of-legends-patch-" + version +"-notes/";

            Request searchRequest = new Request.Builder()
                    .url(fullUrl)
                    .method("GET", null)
                    .addHeader("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7")
                    .addHeader("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7")
                    .addHeader("Referer", "https://www.google.com/")
                    .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36")
                    .addHeader("Sec-Fetch-Dest", "document")
                    .addHeader("Sec-Fetch-Mode", "navigate")
                    .addHeader("Sec-Fetch-Site", "same-origin")
                    .build();

            try (Response response = client.newCall(searchRequest).execute()) {
                if (!response.isSuccessful()) {
                    log.error("서버 에러: {} - {}", response.code(), response.message());
                }
                htmlResponse = (response.body() != null) ? response.body().string() : "";
            }
        } catch (SocketTimeoutException e) {
            log.error("타임아웃 발생: {}", e.getMessage());
        } catch (IOException e) {
            log.error("네트워크 연결 실패: {}", e.getMessage());
        }

        try {
            if (htmlResponse.isBlank()) {
                log.error("htmlResponse 빈 응답 : {}", htmlResponse);
            }

//            System.out.println(htmlResponse);
            Document doc = Jsoup.parse(htmlResponse);

            Elements headers = doc.select("#patch-notes-container .header-primary");

            for (Element header : headers) {
                Element h2 = header.selectFirst("h2");

                if (h2 == null) { continue; }

                String h2Id = h2.id();
                String matchedKeyword = null;

                for (String keyword : TARGET_KEYWORDS) {
                    if (h2Id.contains(keyword)) {
                        matchedKeyword = keyword;
                        break;
                    }
                }

                if (matchedKeyword == null) { continue; }

                StringBuilder html = new StringBuilder();

                if ("skins".equals(matchedKeyword)) {

                    // skins는 header 바로 다음 div 하나만 추출
                    Element current = header.nextElementSibling();

                    if (current != null && current.is("div")) {
                        html.append(current.outerHtml());
                    }

                } else {

                    // 나머지는 다음 header-primary 직전까지 전부 추출
                    Element current = header.nextElementSibling();

                    while (current != null) {

                        if (current.is(".header-primary")) {
                            break;
                        }

                        html.append(current.outerHtml());

                        current = current.nextElementSibling();
                    }
                }

                result.put(matchedKeyword, html.toString());
            }
        } catch (Exception e) {
            log.error("알수없는 에러: {}", e.getMessage());
        }

        return result;
    }

	public static void main(String[] args) throws IOException {
		SpringApplication.run(DemoApplication.class, args);

        Map<String, String> sections = crawlingTest("26-14");

        sections.forEach((section, html) -> {
            System.out.println("===== " + section + " =====");
            System.out.println(html);
        });
    }
}

