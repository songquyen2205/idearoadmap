const HAMMER_DATA = {
  project_info: {
    title: "Hammer BA/PM Portal",
    subtitle: "Cổng thông tin Nghiệp vụ & Kỹ thuật",
    version: "2026.07.09",
    description: "Website hỗ trợ BA, PM và PO dễ dàng đọc hiểu, tiếp cận nghiệp vụ của dự án Hammer và đối chiếu trực tiếp với mã nguồn Rails backend."
  },
  painpoints: [
    {
      actor: "student",
      actorName: "Học viên (Student / Buyer)",
      icon: "👤",
      items: [
        {
          title: "Mua vé sự kiện phiền hà",
          painpoint: "Học viên muốn tham gia một sự kiện/workshop nhảy đơn lẻ nhưng ngại phải tải ứng dụng di động, đăng ký tài khoản và xác thực email phức tạp.",
          solution: "Guest Checkout (Thanh toán vãng lai) trên Web browser không cần tải app.",
          tech: "Gọi API Rails `/api/v1/.../checkout` cấp token thanh toán ẩn danh, xử lý giao dịch qua cổng Airwallex và gửi vé trực tiếp về Email.",
          file_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/event_user.rb"
        },
        {
          title: "Quên lịch học và link Zoom",
          painpoint: "Học viên dễ quên lịch học trực tuyến (Zoom) hoặc không tìm thấy liên kết phòng học khi đến giờ học.",
          solution: "Cron-job nhắc lịch đa kênh tự động gửi thông báo.",
          tech: "Sidekiq Cron chạy nền liên tục quét lịch học, gửi Push Notification (FCM) ở các mốc 12h, 1h, và 15 phút kèm liên kết mở thẳng phòng học Zoom.",
          file_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/meeting.rb"
        }
      ]
    },
    {
      actor: "instructor",
      actorName: "Giảng viên (Instructor / Dancer)",
      icon: "💃",
      items: [
        {
          title: "Quản lý phòng học Zoom thủ công",
          painpoint: "Giảng viên mất nhiều thời gian tạo phòng Zoom, đặt mật khẩu và copy link gửi thủ công cho từng học viên.",
          solution: "Tự động hóa kết nối Zoom OAuth và tự cấp phòng học.",
          tech: "Giảng viên nhấn kết nối Zoom một lần (tạo bản ghi Provider zoom). Hệ thống tự động gọi API Zoom tạo phòng học khi xuất bản lớp Live Stream.",
          file_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/provider.rb"
        },
        {
          title: "Thủ tục rút tiền quốc tế phức tạp",
          painpoint: "Rút tiền học phí kiếm được về tài khoản ngân hàng nội địa gặp nhiều trở ngại về tỷ giá và thủ tục chuyển khoản.",
          solution: "Ví điện tử đa số dư tích hợp chuyển tiền ngân hàng Airwallex.",
          tech: "Ví giảng viên chia 3 số dư (available, pending, locked). Giảng viên lưu tài khoản ngân hàng và thực hiện rút tiền Payout qua Airwallex API.",
          file_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/user_bank_account.rb"
        }
      ]
    },
    {
      actor: "organizer",
      actorName: "Đơn vị tổ chức (Event Organizer)",
      icon: "🎟️",
      items: [
        {
          title: "Phe vé và vé giả mạo",
          painpoint: "Khách hàng có thể sao chép, in vé ra làm nhiều bản để chia nhau vào sự kiện trái phép.",
          solution: "Vé điện tử QR Code duy nhất có lưu lịch sử soát vé.",
          tech: "Mỗi vé phát ra có một ticket_code duy nhất. Khi soát vé qua app di động, hệ thống đánh dấu checked_in và cập nhật checkin_at, khóa vé ngay lập tức.",
          file_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/event_user_ticket.rb"
        },
        {
          title: "Quản lý nhân viên soát vé tại cửa",
          painpoint: "Người tổ chức không thể túc trực tại cửa để soát vé và lo ngại nhân viên tự ý cho người ngoài vào.",
          solution: "Phân quyền soát vé chi tiết cho tài khoản nhân viên (Event Staff).",
          tech: "Người tổ chức cấu hình số điện thoại nhân viên vào danh sách EventStaff. API check-in soát vé bắt buộc phải kiểm tra quyền của tài khoản quét.",
          file_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/event_staff.rb"
        }
      ]
    }
  ],
  capabilities: {
    mindmap_code: `mindmap
  root((Hammer Capabilities))
    Xac thuc & Dinh danh
      Dang ky OTP & SSO
      Quan ly Profile Giang vien
      Xac thuc KYC Gate (Ke hoach Agent)
    Social & Truyen thong
      Video ngan (TikTok-like)
      HLS Video Streaming
      Tuong tac (Like/Comment/Follow)
      Kiem duyet noi dung (Report)
    Dao tao (Learning)
      Video Class (Hoc qua video)
      Virtual Class (Hoc theo nhom)
      Live Stream (Hoc qua Zoom)
      Danh gia chat luong (Review)
    Su kien (Events)
      Tao Event & Hang ve
      Phat hanh ve dien tu QR
      Soat ve di dong (Staff scan)
      Hoan ve (Event Refund)
    Tai chinh (Finance)
      Thanh toan Stripe/Airwallex
      Guest Checkout (Khong can app)
      Vi dien tu Giang vien (Wallet)
      Chuyen khoan Payout quoc te
      Giao dich bao chung (Escrow)`,
    list: [
      {
        title: "1. Năng lực Xác thực & Định danh",
        desc: "Quản lý tài khoản người dùng, hồ sơ giảng viên, cấu hình quyền riêng tư và trong tương lai là tích hợp cổng KYC Gate để xác thực thông tin giảng viên trước khi nhận lớp."
      },
      {
        title: "2. Năng lực Truyền thông & Mạng xã hội",
        desc: "Cho phép đăng tải video ngắn làm tư liệu quảng bá bài nhảy, tự động tối ưu hóa dung lượng nén video (AWS MediaConvert), và quản lý các lượt tương tác cộng đồng (Like, Comment, Follow)."
      },
      {
        title: "3. Năng lực Đào tạo (Learning)",
        desc: "Hỗ trợ đóng gói sản phẩm giáo dục linh hoạt dưới dạng Video Class (học qua video quay sẵn VOD), Virtual Class (học trực tiếp theo nhóm định kỳ) hoặc Live Stream (học trực tuyến qua Zoom meeting tự động)."
      },
      {
        title: "4. Năng lực Sự kiện & Bán vé",
        desc: "Cung cấp giải pháp trọn gói từ khâu tạo sự kiện offline, bán vé trực tuyến, soát vé điện tử tại cửa (App Staff quét QR), đến xử lý hủy vé/hoàn tiền vé."
      },
      {
        title: "5. Năng lực Ví & Giao dịch",
        desc: "Xử lý các luồng thanh toán đa quốc gia qua Stripe/Airwallex, giữ tiền bảo chứng đảm bảo quyền lợi giữa người học và giảng viên, và thanh toán tự động chuyển khoản về ngân hàng giảng viên (Payout)."
      }
    ]
  },
  ddd_flows: [
    {
      id: "auth",
      title: "Luồng Xác thực & Nhập môn (Auth Onboarding)",
      code: `sequenceDiagram
    actor U as Người dùng (User)
    participant API as Rails Core
    participant DB as Database
    participant TW as Twilio (SMS)

    U->>API: 1. Đăng ký bằng số điện thoại
    API->>TW: Gửi mã OTP SMS
    Note over API,DB: Event: VerifyOtpCreated
    TW-->>U: Nhận mã OTP trên điện thoại
    U->>API: 2. Nhập mã OTP xác thực
    Note over API,DB: Event: OtpVerified (status = verified)
    U->>API: 3. Điền email / password đăng ký
    API->>DB: Tạo bản ghi User mới (role = user)
    Note over API,DB: Event: UserRegistered (sign_up_status = pending)
    U->>API: 4. Chọn thể loại nhảy ưa thích (Interests)
    API->>DB: Tạo liên kết user_interests
    Note over API,DB: Event: InterestsSelected (sign_up_status = selecting_interests)
    API->>DB: Cập nhật sign_up_status = completed
    Note over API,DB: Event: OnboardingCompleted`,
      events: [
        {
          name: "VerifyOtpCreated",
          trigger: "Người dùng nhấn 'Lấy mã OTP' bằng số điện thoại.",
          model: "verify_otp.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/verify_otp.rb",
          state_change: "Tạo bản ghi VerifyOtp mới với status = pending, expired_at = 10 phút sau."
        },
        {
          name: "OtpVerified",
          trigger: "Người dùng nhập mã xác thực OTP gửi về SMS.",
          model: "verify_otp.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/verify_otp.rb",
          state_change: "Cập nhật status = verified."
        },
        {
          name: "UserRegistered",
          trigger: "Người dùng điền email, mật khẩu để hoàn thành đăng ký tài khoản.",
          model: "user.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/user.rb",
          state_change: "Tạo mới bản ghi User (role = user, sign_up_status = pending). Đồng thời tạo mặc định các bản ghi notification_setting và privacy_setting."
        },
        {
          name: "InterestsSelected",
          trigger: "Người dùng lựa chọn danh sách thể loại nhảy yêu thích lúc onboarding.",
          model: "user_interest.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/user_interest.rb",
          state_change: "Lưu các liên kết vào bảng user_interests, cập nhật User.sign_up_status = selecting_interests."
        },
        {
          name: "OnboardingCompleted",
          trigger: "Hệ thống chuyển đổi màn hình sau khi chọn xong sở thích.",
          model: "user.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/user.rb",
          state_change: "Cập nhật User.sign_up_status = completed. Người dùng được chuyển vào trang chủ."
        }
      ]
    },
    {
      id: "video",
      title: "Luồng Sản xuất Video Lớp học (Video Class VOD)",
      code: `flowchart TD
    A[Instructor tạo nháp ClassRoom] -->|Event: ClassRoomCreated| B(Trạng thái: draft)
    B -->|Instructor tải video lên S3| C[Event: CourseVideoUploaded]
    C -->|Hệ thống gửi lệnh nén| D[Event: HlsConversionTriggered]
    D -->|AWS MediaConvert xử lý nén| E{Kiểm tra trạng thái?}
    E -->|Thành công| F[Event: HlsConversionCompleted]
    E -->|Thất bại| G[Event: HlsConversionFailed]
    F -->|Instructor nhấn Publish| H[Event: ClassRoomPublished]
    H -->|Trạng thái: publish| I[Khách hàng có thể nhìn thấy & mua lớp]`,
      events: [
        {
          name: "ClassRoomCreated",
          trigger: "Giảng viên click tạo lớp học video nháp trên Web/App.",
          model: "class_room.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/class_room.rb",
          state_change: "Tạo ClassRoom mới với status = draft, class_type = video_class."
        },
        {
          name: "CourseVideoUploaded",
          trigger: "Giảng viên tải video bài giảng lên AWS S3 qua link ký sẵn (presigned URL).",
          model: "course.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/course.rb",
          state_change: "Tạo bản ghi Course liên kết với ClassRoom, lưu trữ đường dẫn file gốc trên S3."
        },
        {
          name: "HlsConversionTriggered",
          trigger: "Worker Sidekiq (CompressVideoWorker) quét phát hiện video bài học mới.",
          model: "hls_convert.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/hls_convert.rb",
          state_change: "Tạo bản ghi HlsConvert, gửi lệnh nén tới AWS MediaConvert, cập nhật ClassRoom.video_compression_state = processing."
        },
        {
          name: "HlsConversionCompleted",
          trigger: "AWS MediaConvert hoàn tất nén và trả về webhook thành công.",
          model: "hls_convert.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/hls_convert.rb",
          state_change: "Lưu file nén phân đoạn m3u8 vào CSDL, cập nhật ClassRoom.video_compression_state = complete."
        },
        {
          name: "ClassRoomPublished",
          trigger: "Giảng viên nhấn nút 'Xuất bản' sau khi video đã nén xong.",
          model: "class_room.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/class_room.rb",
          state_change: "Cập nhật ClassRoom.status = publish. Lớp học chính thức hiển thị công khai trên ứng dụng để học viên chọn mua."
        }
      ]
    },
    {
      id: "zoom",
      title: "Luồng Livestream & Nhắc lịch học (Zoom & Notification)",
      code: `sequenceDiagram
    actor I as Giảng viên (Instructor)
    participant API as Rails Core
    participant Z as Zoom Service
    participant SK as Sidekiq Job
    participant FCM as Firebase (Push)

    I->>API: 1. Xuất bản lớp học Live Stream
    API->>Z: 2. Gọi API tạo Zoom Room (OAuth)
    Note over API,Z: Event: ZoomMeetingCreated
    Z-->>API: Trả về link room, password & ID Zoom
    API->>API: Lưu dữ liệu vào model Meeting
    Note over API,SK: Event: LiveStreamClassPublished
    
    loop Quét lịch học định kỳ mỗi 10 phút
        SK->>API: Kiểm tra lớp sắp diễn ra
        alt 24 giờ trước buổi học
            SK->>I: Gửi email nhắc giảng viên chuẩn bị
            Note over SK: Event: InstructorReminderSent
        else 12 giờ / 1 giờ / 15 phút trước buổi học
            SK->>FCM: Gửi Push Notification cho học viên
            Note over SK: Event: StudentReminderSent
        end
    end`,
      events: [
        {
          name: "ZoomMeetingCreated",
          trigger: "Giảng viên xuất bản lớp học Live Stream trực tuyến.",
          model: "meeting.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/meeting.rb",
          state_change: "Gọi API Zoom tạo phòng học trực tuyến, lưu link Zoom, room ID, password vào bảng meetings."
        },
        {
          name: "LiveStreamClassPublished",
          trigger: "Hệ thống xác thực đã tạo Zoom Meeting thành công.",
          model: "class_room.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/class_room.rb",
          state_change: "Cập nhật ClassRoom.status = publish, mở bán công khai."
        },
        {
          name: "InstructorReminderSent",
          trigger: "Cron job quét thấy lớp học sắp diễn ra còn đúng 24h.",
          model: "user_mailer.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/mailers/",
          state_change: "Hệ thống tự động kích hoạt ActionMailer gửi email hướng dẫn chuẩn bị kỹ thuật cho Giảng viên."
        },
        {
          name: "StudentReminderSent",
          trigger: "Cron job chạy nền quét phát hiện lớp học Zoom sắp bắt đầu còn 12h, 1h, và 15 phút.",
          model: "notification.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/notification.rb",
          state_change: "Tạo bản ghi Notification và SendNotification, gọi FCM gửi Push Notification đẩy thông báo kèm link Zoom đến thiết bị học viên."
        }
      ]
    },
    {
      id: "event",
      title: "Luồng Mua vé & Check-in Sự kiện (Event Ticketing)",
      code: `sequenceDiagram
    actor G as Khách vãng lai
    actor S as Nhân viên soát vé (Staff)
    participant API as Rails Core
    participant AWX as Airwallex SDK

    G->>API: 1. Đặt vé sự kiện (nhập email)
    API->>AWX: 2. Tạo Payment Intent
    Note over API,AWX: Event: OrderCreated (status = pending)
    G->>AWX: 3. Nhập thông tin thẻ và thanh toán
    AWX-->>API: 4. Xác nhận thanh toán thành công
    API->>API: 5. Chuyển trạng thái Order sang completed
    Note over API: Event: PaymentConfirmed
    API->>API: 6. Tạo vé event_user_ticket với mã QR độc nhất
    Note over API: Event: EventUserTicketIssued
    
    Note over G,S: Khách mang vé QR tới sự kiện
    S->>API: 7. Dùng App quét mã QR của khách
    API->>API: 8. Xác thực quyền soát vé của Staff
    API->>API: 9. Cập nhật trạng thái vé sang checked_in
    Note over API: Event: AttendeeCheckedIn`,
      events: [
        {
          name: "OrderCreated",
          trigger: "Khách vãng lai bấm thanh toán vé sự kiện trên trình duyệt web.",
          model: "event_user.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/event_user.rb",
          state_change: "Tạo mới bản ghi EventUser với status = pending, gửi yêu cầu thanh toán sang Airwallex."
        },
        {
          name: "PaymentConfirmed",
          trigger: "Cổng Airwallex thông báo thanh toán thành công qua Webhook.",
          model: "event_user.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/event_user.rb",
          state_change: "Cập nhật EventUser.status = completed, tăng sold_quantity của loại vé tương ứng."
        },
        {
          name: "EventUserTicketIssued",
          trigger: "Đơn hàng vé chuyển sang trạng thái hoàn tất thành công.",
          model: "event_user_ticket.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/event_user_ticket.rb",
          state_change: "Sinh ngẫu nhiên mã ticket_code QR duy nhất, tạo bản ghi EventUserTicket trạng thái active và gửi email chứa QR vé cho khách hàng."
        },
        {
          name: "AttendeeCheckedIn",
          trigger: "Staff dùng camera điện thoại quét mã QR của khách tại sự kiện.",
          model: "event_user_ticket.rb",
          model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/event_user_ticket.rb",
          state_change: "Kiểm tra quyền của Staff, chuyển vé sang status = checked_in, cập nhật checkin_at và checkin_by."
        }
      ]
    }
  ],
  core_rules: [
    {
      title: "A. Quy tắc ba số dư trong Ví Giảng viên (Wallet Balances)",
      filename: "wallet.rb",
      code_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/wallet.rb",
      points: [
        "<strong>Locked Balance (Số dư bị khóa):</strong> Giữ doanh thu của các Lớp học ảo (Virtual Class) hoặc Sự kiện (Events) chưa diễn ra. Tiền bị khóa để đảm bảo ban tổ chức không 'bùng' sự kiện.",
        "<strong>Pending Balance (Số dư chờ đối soát):</strong> Giữ doanh thu từ Video Class (VOD) quay sẵn trong vòng 7 - 14 ngày (tùy cấu hình) để chờ hết hạn khiếu nại hoàn tiền của học viên.",
        "<strong>Available Balance (Số dư khả dụng):</strong> Tiền thực tế giảng viên được phép làm lệnh rút (Payout). Tiền chỉ được chuyển từ Locked hoặc Pending sang Available sau khi sự kiện kết thúc thành công hoặc quá hạn khiếu nại."
      ]
    },
    {
      title: "B. Quy tắc tính phí rút tiền (SWIFT Payout Fee)",
      filename: "PayoutScreen.tsx",
      code_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-mobile/src/screens/payout/PayoutScreen.tsx#L51",
      points: [
        "Hệ thống áp dụng mức phí cố định <strong>$35 USD</strong> cho mỗi lệnh rút tiền quốc tế bằng hình thức SWIFT (quy định cứng trong mã nguồn di động).",
        "<strong>Hạn mức rút tối thiểu:</strong> Lệnh rút tiền phải có giá trị lớn hơn $35 USD. Số tiền thực tế chuyển tới ngân hàng của giảng viên sẽ là <code>Số tiền yêu cầu rút - $35 USD</code>."
      ]
    },
    {
      title: "C. Quy tắc Xóa mềm dữ liệu (Soft Delete)",
      filename: "user.rb",
      code_link: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/user.rb",
      points: [
        "Để bảo toàn dữ liệu đối soát và hóa đơn tài chính, hệ thống sử dụng cơ chế xóa mềm (Soft Delete) thông qua trường <code>deleted_at</code> trong CSDL (sử dụng thư viện <code>acts_as_paranoid</code>).",
        "<strong>Áp dụng cho các bảng:</strong> <code>users</code>, <code>user_profiles</code>, <code>instructor_profiles</code>, <code>paid_items</code>, <code>event_staffs</code>, <code>reviews</code>, <code>tickets</code>.",
        "<strong>Hành vi thực tế:</strong> Khi giảng viên hoặc học viên nhấn 'Xóa tài khoản' hoặc 'Xóa đánh giá', dữ liệu không bị biến mất hoàn toàn khỏi Database. Hệ thống chỉ cập nhật mốc thời gian xóa vào trường <code>deleted_at</code>. Toàn bộ các câu query tìm kiếm mặc định sẽ tự động ẩn các bản ghi đã xóa này."
      ]
    }
  ],
  faqs: [
    {
      q: "Làm sao ngăn chặn lỗi trừ tiền khách hàng 2 lần (Double-Submit) khi hệ thống Rails đang thiếu Idempotency Key?",
      a: "Do API gọi Airwallex (`airwallex/payment_intent_service.rb`) đang thiếu tham số chống trùng lặp. BA/PM cần điều hướng thiết thiết kế: Frontend bắt buộc phải disable nút thanh toán ngay sau click đầu tiên và hiển thị spinner. Backend Rails cần được nâng cấp bổ sung khóa chống trùng lặp (Idempotency Key) bằng `order_id` khi confirm thanh toán với Stripe/Airwallex.",
      model: "payment_intent_service.rb",
      model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/services/airwallex/payment_intent_service.rb"
    },
    {
      q: "Hệ thống lưu thời gian UTC ở DB. Làm sao để hiển thị lịch học ở các nước khác nhau không bị lệch giờ?",
      a: "Tất cả thời gian của lớp học/sự kiện đều lưu chuẩn UTC ở CSDL PostgreSQL. Khi gọi API, frontend (Next.js/React Native) phải đọc chuỗi múi giờ địa phương từ điện thoại/trình duyệt và dùng helper (`useFormatPrice` / moment.js) để quy đổi hiển thị chuẩn theo múi giờ của thiết bị người dùng.",
      model: "schema.rb",
      model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/db/schema.rb"
    },
    {
      q: "Nếu lệnh Payout bị thất bại từ phía Airwallex ngân hàng (ví dụ điền sai số tài khoản), số dư giảng viên sẽ thế nào?",
      a: "Lệnh Payout ban đầu tạo ra sẽ lập tức trừ tiền khả dụng trong ví của giảng viên. Khi Airwallex trả về Webhook trạng thái failed, backend Rails phải tự động hoàn trả số tiền rút cộng lại vào ví của giảng viên, chuyển trạng thái Payout thành failed và tạo bản ghi WalletTransaction đối soát dòng hoàn trả.",
      model: "payout.rb",
      model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/payout.rb"
    },
    {
      q: "Làm sao kiểm soát số tiền duyệt hoàn trả (Refund) không vượt quá số tiền thực tế khách hàng đã thanh toán?",
      a: "CSDL hiện chưa có check cứng mức database cho Refund. BA/PM cần giao việc cho Dev: Bổ sung validation ở tầng Rails Controller kiểm tra `Refund.amount` so với `Order.total_price` thực tế đã trừ tiền trên Stripe/Airwallex trước khi duyệt trạng thái completed.",
      model: "refund.rb",
      model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/refund.rb"
    },
    {
      q: "Khách mua vé bằng Guest Checkout (không đăng nhập) làm sao để họ kiểm tra lại vé và check-in?",
      a: "Guest Checkout liên kết đơn hàng với email của khách. Vé QR chứa mã `ticket_code` duy nhất được gửi qua email. Nếu khách làm mất, Admin có thể tìm kiếm đơn hàng trên CMS `/admin/event_users` bằng email và bấm nút 'Resend Ticket' để gửi lại email chứa mã QR soát vé.",
      model: "event_user_ticket.rb",
      model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/event_user_ticket.rb"
    },
    {
      q: "Có cơ chế Soft Delete (xóa mềm) nào trong hệ thống không? Khi xóa User thì dữ liệu có bị biến mất hẳn không?",
      a: "Nhiều bảng như `users`, `user_profiles`, `paid_items` dùng `acts_as_paranoid`. Khi xóa, dữ liệu không biến mất khỏi DB mà chỉ ghi nhận mốc thời gian vào trường `deleted_at`. Toàn bộ các câu query tìm kiếm mặc định sẽ tự động ẩn các bản ghi đã xóa mềm này để phục vụ mục đích kiểm toán tài chính.",
      model: "user.rb",
      model_url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/user.rb"
    }
  ],
  ai_agent_details: {
    allocation: [
      {
        title: "Bộ cào tin (Web Crawler) & Khớp nối (Smart Matching)",
        status: "new",
        statusText: "Xây mới 100%",
        desc: "Xây dựng hệ thống quét 5 giai đoạn: Nhận link -> Cào text -> Lọc rác/spam -> Gộp trùng chéo nguồn (Canonical Key băm từ Tiêu đề + Org + Ngày + Địa điểm) -> Lưu database Postgres (pgvector)."
      },
      {
        title: "Cổng xác thực danh tính di động (KYC Gate)",
        status: "new",
        statusText: "Xây mới 100%",
        desc: "Dancer tải ảnh ID/Passport lên app, hệ thống tự động đóng dấu đóng watermark độc quyền của Hammer ('Passport_Front_Watermarked.jpg') để bảo mật và mở khóa tính năng tìm job ngay lập tức mà không cần Admin duyệt tay."
      },
      {
        title: "Tự động soạn thư nháp (1-Click AI Draft)",
        status: "new",
        statusText: "Xây mới 100%",
        desc: "AI tự động sinh email/tin nhắn ứng tuyển chuyên nghiệp cho Dancer dựa trên 6 trường Bio (thể loại nhảy, năm kinh nghiệm, địa điểm, mức phí, zoom status, và reels portfolio)."
      },
      {
        title: "Thanh toán vãng lai (Guest Checkout & Real-Time Checkout)",
        status: "reuse",
        statusText: "Tái sử dụng & Mở rộng",
        desc: "Tái sử dụng cổng thanh toán thẻ Stripe và PayNow Airwallex cho Client vãng lai. Thiết kế link thông minh tự động hủy phiên cũ và cập nhật giá thanh toán mới ngay khi Dancer chỉnh sửa quote trên app."
      },
      {
        title: "Ví bảo chứng giải ngân & Rút tiền (Wallet & Airwallex Payouts)",
        status: "extend",
        statusText: "Mở rộng 80%",
        desc: "Khi Client approve hoặc sau 48h tự động giải ngân, 10% phí dịch vụ được khấu trừ về Hammer, 90% còn lại cộng vào ví khả dụng (Available Balance) của Dancer. Dancer gửi yêu cầu rút tiền -> Backend gọi API Payouts của Airwallex để chuyển thẳng về ngân hàng nội địa."
      },
      {
        title: "Hệ thống chỉ số đo lường (Marketplace Metrics)",
        status: "new",
        statusText: "Xây mới 100%",
        desc: "Đo lường 4 chỉ số chính: Lượt cập nhật profile & Lượt đăng ký tải app (CMS Logs); Số matching thành công & Lượt nhận/bỏ qua việc (Share song song giữa CMS Dashboard và thẻ báo cáo tuần trên App của Dancer)."
      }
    ],
    escrow_rules: [
      "Khách hàng thanh toán qua link hóa đơn vãng lai bằng Stripe (Thẻ) hoặc Airwallex (PayNow). Tiền được khóa bảo chứng trong tài khoản Escrow.",
      "Dancer hoàn thành công việc -> Hệ thống tự động gửi Email Gate thông báo chốt việc cho Client với 2 nút bấm: 'Approve & Release' hoặc 'Report an Issue'.",
      "Nếu Client không phản hồi trong vòng 48 giờ (Khung giờ cố định chuẩn MVP), hệ thống kích hoạt cron-job tự động phê duyệt và giải ngân để bảo vệ Dancer.",
      "Khi giải ngân thành công: 10% phí dịch vụ được chuyển về tài khoản doanh thu của Hammer. 90% còn lại được ghi có vào Hammer Wallet của Dancer.",
      "Dancer tạo lệnh rút tiền -> Backend tự động chuyển tiền trực tiếp từ ví về tài khoản ngân hàng nội địa thông qua API Payouts của Airwallex."
    ],
    security: {
      title: "Ràng buộc bảo mật & Giới hạn Dữ liệu AI",
      desc: "Để đáp ứng ràng buộc bảo mật: 'AI Agent không được phép truy cập trực tiếp vào dữ liệu thanh toán, thông tin thẻ và tài khoản ngân hàng của dancer', team thiết kế kỹ thuật theo mô hình giới hạn quyền truy cập bằng Function Calling:",
      points: [
        "<strong>Tận dụng Cơ sở dữ liệu chung:</strong> Dịch vụ NestJS kết nối trực tiếp vào cơ sở dữ liệu PostgreSQL hiện tại của DanzPeople để tối ưu hóa dữ liệu dancer sẵn có.",
        "<strong>Giới hạn quyền đọc của AI qua Function Calling:</strong> AI hoàn toàn không có quyền chạy query SQL tự do vào database. Dữ liệu đầu vào của AI được giới hạn nghiêm ngặt qua các Tool Functions lập trình cứng (ví dụ: chỉ trả về thể loại nhảy và thành phố). AI không có bất kỳ quyền hạn hay hàm chức năng nào để tiếp cận dữ liệu ví tiền hay tài khoản ngân hàng của dancer."
      ]
    }
  },
  glossary: [
    { en: "User", vi: "Người dùng", desc: "Tài khoản đăng ký trên hệ thống, mặc định có vai trò học viên/khán giả.", model: "user.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/user.rb" },
    { en: "Instructor", vi: "Giảng viên / Dancer", desc: "Tài khoản có hồ sơ giảng dạy, có quyền tạo lớp học, sự kiện và rút tiền kiếm được.", model: "instructor_profile.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/instructor_profile.rb" },
    { en: "Guest", vi: "Khách vãng lai", desc: "Khách chưa đăng ký, mua vé sự kiện nhanh không cần tải app (Guest Checkout).", model: "authorize_helper.rb", url: "" },
    { en: "ClassRoom", vi: "Lớp học", desc: "Thực thể lớp học lớn chứa thông tin mô tả, thể loại nhạc và giá bán.", model: "class_room.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/class_room.rb" },
    { en: "Video Class", vi: "Khóa học video quay sẵn", desc: "Lớp học chứa các bài học video quay sẵn (VOD), mua một lần xem mãi mãi.", model: "class_room.rb (class_type)", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/class_room.rb" },
    { en: "Virtual Class", vi: "Lớp học định kỳ", desc: "Học trực tiếp theo nhóm học viên dựa trên lịch trình cố định trong tuần.", model: "course_group.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/course_group.rb" },
    { en: "Live Stream", vi: "Học trực tiếp Zoom", desc: "Buổi học online dạy qua Zoom được khởi tạo phòng tự động bằng hệ thống.", model: "meeting.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/meeting.rb" },
    { en: "Event", vi: "Sự kiện", desc: "Sự kiện nhảy offline có bán vé, giới hạn số lượng và quản lý soát vé bằng QR.", model: "event.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/event.rb" },
    { en: "EventUserTicket", vi: "Vé điện tử cá nhân", desc: "Chi tiết chiếc vé điện tử có mã QR duy nhất để nhân viên soát vé quét check-in.", model: "event_user_ticket.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/event_user_ticket.rb" },
    { en: "EventStaff", vi: "Nhân sự soát vé", desc: "Nhân viên soát vé được phân quyền check-in vé bằng điện thoại tại cửa sự kiện.", model: "event_staff.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/event_staff.rb" },
    { en: "Wallet", vi: "Ví điện tử giảng viên", desc: "Ví chứa doanh thu chia làm 3 loại khả dụng, chờ đối soát và bị khóa.", model: "wallet.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/wallet.rb" },
    { en: "Payout", vi: "Rút tiền ngân hàng", desc: "Lệnh chuyển khoản rút tiền từ ví khả dụng về tài khoản ngân hàng qua Airwallex.", model: "payout.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/hammer-api/app/models/payout.rb" },
    { en: "Refund", vi: "Hoàn tiền lớp học", desc: "Yêu cầu trả lại tiền mua lớp học của học viên, cần quản trị viên duyệt thủ công.", model: "refund.rb", url: "file:///c:/Users/Song%20Quyen/Hammer/DEV/refund.rb" },
    { en: "Escrow", vi: "Ví bảo chứng giữ tiền", desc: "Cơ chế khóa tiền của khách hàng và tự động giải ngân sau 24h-72h khi việc xong.", model: "Năng lực mới", url: "" }
  ],
  database_erd: {
    title: "Kiến trúc CSDL & Sơ đồ ERD của AI Agent",
    tables: [
      {
        name: "SourceLink (Nguồn cào tin)",
        desc: "Lưu trữ danh sách các liên kết mục tiêu (Instagram, FB, Studio) được cấu hình cào tự động.",
        columns: [
          { name: "id", type: "String (text/UUID) PK", desc: "Khóa chính." },
          { name: "sourceCode", type: "String (text)", desc: "Mã nguồn duy nhất để định danh." },
          { name: "category", type: "String (text)", desc: "Thể loại: Instagram, Facebook, Website..." },
          { name: "name", type: "String (text)", desc: "Tên hiển thị của nguồn cào." },
          { name: "url", type: "String (text)", desc: "Đường dẫn URL gốc của trang." },
          { name: "country", type: "String (text)", desc: "Quốc gia của nguồn tuyển dụng." },
          { name: "city", type: "String (text)", desc: "Thành phố." },
          { name: "contactType", type: "String (text)", desc: "Cách thức liên hệ (ví dụ: DM, email, form)." },
          { name: "fit", type: "String (text)", desc: "Đánh giá mức độ phù hợp của nguồn cào quét." },
          { name: "priority", type: "Int (integer)", desc: "Độ ưu tiên cào quét (1 đến 3)." },
          { name: "enabled", type: "Boolean (boolean)", desc: "Bật/Tắt cào quét tự động." },
          { name: "lastCrawledAt", type: "DateTime (timestamp)", desc: "Thời điểm cào quét gần nhất." },
          { name: "crawlStatus", type: "String (text)", desc: "Trạng thái cào quét (SUCCESS/FAILED)." },
          { name: "errorMessage", type: "String (text)", desc: "Thông báo lỗi nếu cào quét thất bại." },
          { name: "createdAt / updatedAt", type: "DateTime (timestamp)", desc: "Thời gian tạo và cập nhật bản ghi." }
        ]
      },
      {
        name: "RawPage (Trang thô đã cào)",
        desc: "Lưu dữ liệu text/html thô đã cào về để phân tích và chống cào trùng nội dung.",
        columns: [
          { name: "id", type: "String (text/UUID) PK", desc: "Khóa chính." },
          { name: "sourceId", type: "String (text) FK", desc: "Khóa ngoại liên kết bảng SourceLink.id." },
          { name: "url", type: "String (text)", desc: "Đường dẫn URL chi tiết đã cào." },
          { name: "finalUrl", type: "String (text)", desc: "Đường dẫn URL sau khi redirect." },
          { name: "title", type: "String (text)", desc: "Tiêu đề trang web đã cào quét." },
          { name: "html", type: "String (text)", desc: "Mã nguồn HTML thô." },
          { name: "text", type: "String (text)", desc: "Nội dung văn bản sạch trích xuất được." },
          { name: "contentHash", type: "String (text) UNIQUE", desc: "Mã MD5/SHA băm văn bản để so sánh chống cào trùng." },
          { name: "statusCode", type: "Int (integer)", desc: "Mã HTTP status code của lượt cào quét." },
          { name: "errorMessage", type: "String (text)", desc: "Lỗi chi tiết khi tải trang." },
          { name: "scrapedAt", type: "DateTime (timestamp)", desc: "Thời điểm cào quét." }
        ]
      },
      {
        name: "Opportunity (Cơ hội việc làm cào được)",
        desc: "Lưu trữ thông tin chi tiết các công việc đã được AI phân tích và chuẩn hóa từ trang thô.",
        columns: [
          { name: "id", type: "String (text/UUID) PK", desc: "Khóa chính." },
          { name: "sourceId", type: "String (text) FK", desc: "Khóa ngoại liên kết bảng SourceLink.id." },
          { name: "rawPageId", type: "String (text) FK", desc: "Khóa ngoại liên kết bảng RawPage.id." },
          { name: "title", type: "String (text)", desc: "Tên công việc (ví dụ: K-Pop Instructor)." },
          { name: "organization", type: "String (text)", desc: "Đơn vị tuyển dụng." },
          { name: "opportunityType", type: "String (text)", desc: "Loại hình (Full-time, Part-time, Project...)." },
          { name: "description", type: "String (text)", desc: "Mô tả công việc chi tiết." },
          { name: "danceStyles", type: "String[] (array)", desc: "Yêu cầu các thể loại nhảy." },
          { name: "locationText", type: "String (text)", desc: "Địa điểm bằng văn bản." },
          { name: "city / country", type: "String (text)", desc: "Thành phố và quốc gia tuyển dụng." },
          { name: "requirements", type: "Jsonb (json)", desc: "Thông tin yêu cầu chi tiết (độ tuổi, kinh nghiệm...)." },
          { name: "compensation", type: "Jsonb (json)", desc: "Mức lương/phí thỏa thuận (đơn vị, số tiền, hình thức)." },
          { name: "applicationUrl", type: "String (text)", desc: "Link form/website để ứng tuyển trực tiếp." },
          { name: "contactEmail / contactPhone", type: "String (text)", desc: "Thông tin email và số điện thoại liên hệ." },
          { name: "deadline", type: "DateTime (timestamp)", desc: "Hạn chót ứng tuyển." },
          { name: "eventStartDate / eventEndDate", type: "DateTime (timestamp)", desc: "Thời gian bắt đầu và kết thúc sự kiện/công việc." },
          { name: "confidence", type: "Float (double)", desc: "Độ tin cậy của AI khi trích xuất dữ liệu (0.00 đến 1.00)." },
          { name: "completenessScore", type: "Float (double)", desc: "Điểm mức độ hoàn thiện của tin (0.00 đến 1.00)." },
          { name: "missingFields", type: "String[] (array)", desc: "Các trường thông tin còn thiếu trong tin tuyển dụng." },
          { name: "rawUrl", type: "String (text)", desc: "Đường dẫn URL nguồn thô của tin." },
          { name: "canonicalKey", type: "String (text) UNIQUE", desc: "Mã băm composite (Title+Org+Date+Location) để gom trùng chéo nguồn." },
          { name: "status", type: "String (text)", desc: "Trạng thái duyệt tin (pending_moderation, approved, archived)." },
          { name: "extractedAt / updatedAt", type: "DateTime (timestamp)", desc: "Thời điểm AI trích xuất và cập nhật tin." }
        ]
      },
      {
        name: "Dancer (Hồ sơ Vũ công)",
        desc: "Lưu thông tin hồ sơ vũ công dùng làm dữ liệu đầu vào so khớp với Job.",
        columns: [
          { name: "id", type: "String (text/UUID) PK", desc: "Khóa chính." },
          { name: "fullName", type: "String (text)", desc: "Họ và tên vũ công." },
          { name: "email / phone", type: "String (text)", desc: "Email và số điện thoại liên hệ." },
          { name: "city / country", type: "String (text)", desc: "Thành phố và quốc gia sinh sống hiện tại." },
          { name: "danceStyles", type: "String[] (array)", desc: "Các thể loại nhảy chuyên môn (Hip-hop, Jazz...)." },
          { name: "preferredTypes", type: "String[] (array)", desc: "Các loại hình công việc mong muốn (Instructor, Backup dancer...)." },
          { name: "skillLevel", type: "String (text)", desc: "Trình độ kỹ năng (Beginner, Intermediate, Advanced)." },
          { name: "yearsExperience", type: "Int (integer)", desc: "Số năm kinh nghiệm." },
          { name: "availability", type: "Jsonb (json)", desc: "Lịch rảnh trong tuần." },
          { name: "travelRadiusKm", type: "Int (integer)", desc: "Bán kính tối đa chấp nhận di chuyển đi làm (km)." },
          { name: "minCompensation / currency", type: "Float (double) / String", desc: "Mức thù lao mong muốn tối thiểu và đơn vị tiền tệ." },
          { name: "portfolioUrls", type: "String[] (array)", desc: "Danh sách link video Reels/YouTube portfolio." },
          { name: "languages", type: "String[] (array)", desc: "Các ngôn ngữ có thể giao tiếp." },
          { name: "profileDescription", type: "String (text)", desc: "Giới thiệu bản thân." },
          { name: "isActive", type: "Boolean (boolean)", desc: "Trạng thái hoạt động tìm job." },
          { name: "createdAt / updatedAt", type: "DateTime (timestamp)", desc: "Thời gian đăng ký và cập nhật tài khoản." }
        ]
      },
      {
        name: "Recommendation (Bảng so khớp AI)",
        desc: "Lưu trữ điểm số match %, chi tiết các điểm thành phần, lý do đề xuất và thư ứng tuyển do AI soạn sẵn.",
        columns: [
          { name: "id", type: "String (text/UUID) PK", desc: "Khóa chính." },
          { name: "opportunityId", type: "String (text) FK", desc: "Khóa ngoại liên kết bảng Opportunity.id." },
          { name: "dancerId", type: "String (text) FK", desc: "Khóa ngoại liên kết bảng Dancer.id." },
          { name: "finalScore", type: "Float (double)", desc: "Điểm match tổng quan (ví dụ: 0.96 = 96% Match)." },
          { name: "styleScore / locationScore / typeScore", type: "Float (double)", desc: "Điểm thành phần: Độ phù hợp thể loại nhảy, địa điểm di chuyển, loại hình công việc." },
          { name: "availabilityScore / experienceScore / compensationScore", type: "Float (double)", desc: "Điểm thành phần: Độ phù hợp lịch rảnh, số năm kinh nghiệm, mức lương thỏa thuận." },
          { name: "reason", type: "String (text)", desc: "Văn bản giải thích lý do khớp ('Why AI picked this for you')." },
          { name: "risks", type: "String[] (array)", desc: "Các rủi ro tiềm ẩn được AI cảnh báo khi ghép cặp (ví dụ: lệch múi giờ, thiếu ngôn ngữ)." },
          { name: "suggestedMessage", type: "String (text)", desc: "Thư nháp ứng tuyển do AI soạn sẵn (AI Pitch Draft)." },
          { name: "status", type: "String (text)", desc: "Trạng thái đề xuất (pending_review, sent, rejected, accepted)." },
          { name: "createdAt / updatedAt", type: "DateTime (timestamp)", desc: "Thời điểm ghép cặp so khớp và cập nhật." }
        ]
      }
    ]
  }
};

if (typeof module !== 'undefined') {
  module.exports = HAMMER_DATA;
}
