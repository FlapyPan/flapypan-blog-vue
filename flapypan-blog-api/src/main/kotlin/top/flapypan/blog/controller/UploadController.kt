package top.flapypan.blog.controller

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import top.flapypan.blog.common.RestException
import top.flapypan.blog.common.RestResult
import top.flapypan.blog.common.success
import top.flapypan.blog.service.UploadService

@RestController
@RequestMapping("/upload")
class UploadController(
    private val uploadService: UploadService
) {

    @PostMapping
    fun add(@RequestParam("file") multipartFile: MultipartFile): RestResult<String> {
        // 限制为图片
        if (multipartFile.contentType?.startsWith("image/") != true) {
            throw RestException(HttpStatus.BAD_REQUEST.value(), "错误的文件类型")
        }
        return success(uploadService.upload(multipartFile))
    }
}